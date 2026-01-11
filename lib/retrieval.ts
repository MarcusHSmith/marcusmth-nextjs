import { kv } from "./kv";
import OpenAI from "openai";

// Initialize OpenAI client
if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY environment variable is required");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface Chunk {
  chunkId: string;
  slug: string;
  title: string;
  url: string;
  date: string;
  chunkIndex: number;
  content: string;
  embedding: number[];
}

interface RetrievedChunk {
  chunk: Chunk;
  similarity: number;
}

const MAX_CANDIDATES = 200; // Limit candidates for efficiency
const DEFAULT_TOP_K = 12;

/**
 * Tokenize text for keyword matching (same as in ingestion)
 */
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2) // Filter out short tokens
    .filter((token, index, self) => self.indexOf(token) === index); // Deduplicate
}

/**
 * Get candidate chunk IDs using inverted index with keyword matching
 * Falls back to random sample from manifest if no keywords match
 */
async function getCandidateChunkIds(topic: string): Promise<string[]> {
  const tokens = tokenize(topic);
  const candidateSet = new Set<string>();

  // Stage 1: Keyword prefilter using inverted index
  for (const token of tokens) {
    const chunkIds = (await kv.smembers<string[]>(`ai:inv:${token}`)) || [];
    chunkIds.forEach((id) => candidateSet.add(id));
  }

  // If we found candidates via keywords, return them (limited)
  if (candidateSet.size > 0) {
    const candidates = Array.from(candidateSet);
    return candidates.slice(0, MAX_CANDIDATES);
  }

  // Fallback: Random sample from manifest
  const manifestData = await kv.get<string>("ai:manifest");
  if (!manifestData) {
    return [];
  }

  const manifest = JSON.parse(manifestData) as string[];
  if (manifest.length === 0) {
    return [];
  }

  // Return random sample up to MAX_CANDIDATES
  const shuffled = [...manifest].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(MAX_CANDIDATES, manifest.length));
}

/**
 * Calculate cosine similarity between two vectors
 */
function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error("Vectors must have the same length");
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  if (denominator === 0) {
    return 0;
  }

  return dotProduct / denominator;
}

/**
 * Create embedding for text using OpenAI
 */
async function createEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });

  return response.data[0].embedding;
}

/**
 * Retrieve top K chunks for a given topic
 * Uses two-stage retrieval: keyword prefilter + cosine similarity rerank
 */
export async function retrieveTopChunks(
  topic: string,
  k: number = DEFAULT_TOP_K
): Promise<{
  chunks: RetrievedChunk[];
  sources: Array<{ slug: string; title: string; url: string }>;
}> {
  // Stage 1: Get candidate chunk IDs using keyword prefilter
  const candidateIds = await getCandidateChunkIds(topic);

  if (candidateIds.length === 0) {
    return { chunks: [], sources: [] };
  }

  // Stage 2: Create query embedding
  const queryEmbedding = await createEmbedding(topic);

  // Stage 3: Load candidate chunks and compute similarities
  const candidates: RetrievedChunk[] = [];

  for (const chunkId of candidateIds) {
    const chunkData = await kv.get<string>(`ai:chunk:${chunkId}`);
    if (!chunkData) {
      continue;
    }

    const chunk = JSON.parse(chunkData) as Chunk;
    const similarity = cosineSimilarity(queryEmbedding, chunk.embedding);

    candidates.push({
      chunk,
      similarity,
    });
  }

  // Stage 4: Sort by similarity and take top K
  candidates.sort((a, b) => b.similarity - a.similarity);
  const topChunks = candidates.slice(0, k);

  // Extract unique sources
  const sourceMap = new Map<string, { slug: string; title: string; url: string }>();
  topChunks.forEach(({ chunk }) => {
    if (!sourceMap.has(chunk.slug)) {
      sourceMap.set(chunk.slug, {
        slug: chunk.slug,
        title: chunk.title,
        url: chunk.url,
      });
    }
  });

  return {
    chunks: topChunks,
    sources: Array.from(sourceMap.values()),
  };
}
