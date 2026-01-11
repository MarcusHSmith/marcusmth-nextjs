import fs from "fs";
import path from "path";
import matter from "gray-matter";
import crypto from "crypto";
import { kv } from "../lib/kv";
import OpenAI from "openai";

// Configuration
const CHUNK_SIZE_MIN = 1200;
const CHUNK_SIZE_MAX = 1800;
const CHUNK_OVERLAP = 200;
const MAX_CHUNKS_PER_POST = 50; // Limit to keep corpus manageable

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

/**
 * Convert markdown to plain text, preserving link text but removing markdown syntax
 */
function markdownToPlainText(markdown: string): string {
  let text = markdown;

  // Remove code blocks
  text = text.replace(/```[\s\S]*?```/g, "");
  text = text.replace(/`[^`]*`/g, "");

  // Convert links: [text](url) -> text
  text = text.replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1");

  // Remove images: ![alt](url) -> alt
  text = text.replace(/!\[([^\]]*)\]\([^\)]+\)/g, "$1");

  // Remove headers (keep text)
  text = text.replace(/^#{1,6}\s+(.+)$/gm, "$1");

  // Remove bold/italic markers
  text = text.replace(/\*\*([^\*]+)\*\*/g, "$1");
  text = text.replace(/\*([^\*]+)\*/g, "$1");
  text = text.replace(/__([^_]+)__/g, "$1");
  text = text.replace(/_([^_]+)_/g, "$1");

  // Remove horizontal rules
  text = text.replace(/^---$/gm, "");

  // Remove list markers
  text = text.replace(/^[\s]*[-*+]\s+/gm, "");
  text = text.replace(/^[\s]*\d+\.\s+/gm, "");

  // Clean up whitespace
  text = text.replace(/\n{3,}/g, "\n\n");
  text = text.trim();

  return text;
}

/**
 * Chunk text into overlapping segments
 */
function chunkText(text: string): string[] {
  const chunks: string[] = [];
  let start = 0;

  while (start < text.length) {
    let end = start + CHUNK_SIZE_MAX;

    // If we're not at the end, try to break at a sentence boundary
    if (end < text.length) {
      const lastPeriod = text.lastIndexOf(".", end);
      const lastNewline = text.lastIndexOf("\n", end);
      const breakPoint = Math.max(lastPeriod, lastNewline);

      if (breakPoint > start + CHUNK_SIZE_MIN) {
        end = breakPoint + 1;
      }
    }

    const chunk = text.slice(start, end).trim();
    if (chunk.length >= CHUNK_SIZE_MIN) {
      chunks.push(chunk);
    }

    // Move start forward with overlap
    start = end - CHUNK_OVERLAP;
    if (start >= text.length) break;
  }

  return chunks.slice(0, MAX_CHUNKS_PER_POST);
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
 * Tokenize text for inverted index (simple word-based)
 */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2) // Filter out short tokens
    .filter((token, index, self) => self.indexOf(token) === index); // Deduplicate
}

/**
 * Hash file content for change detection
 */
function hashFile(filePath: string): string {
  const content = fs.readFileSync(filePath, "utf-8");
  return crypto.createHash("sha256").update(content).digest("hex");
}

/**
 * Process a single blog post file
 * Returns array of chunk IDs created for this post
 */
async function processPost(
  filePath: string,
  changedOnly: boolean
): Promise<string[] | null> {
  const slug = path.basename(filePath, ".md");
  const fileHash = hashFile(filePath);

  // Check if file has changed
  if (changedOnly) {
    const storedHash = await kv.get<string>(`ai:filehash:${filePath}`);
    if (storedHash === fileHash) {
      console.log(`Skipping unchanged file: ${slug}`);
      return null;
    }
  }

  console.log(`Processing: ${slug}`);

  // Read and parse file
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data: frontmatter, content: markdownContent } = matter(fileContent);

  // Skip unpublished posts
  if (!frontmatter.isPublished) {
    console.log(`Skipping unpublished post: ${slug}`);
    return null;
  }

  // Convert to plain text
  const plainText = markdownToPlainText(markdownContent);

  // Chunk the content
  const chunks = chunkText(plainText);
  console.log(`  Created ${chunks.length} chunks`);

  // Process chunks
  const chunkIds: string[] = [];
  const invertedIndexUpdates: Map<string, Set<string>> = new Map();

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const chunkId = `${slug}-${i}`;

    // Create embedding
    console.log(`  Creating embedding for chunk ${i + 1}/${chunks.length}...`);
    const embedding = await createEmbedding(chunk);

    // Tokenize for inverted index
    const tokens = tokenize(chunk);

    // Build chunk object
    const chunkObj: Chunk = {
      chunkId,
      slug,
      title: frontmatter.title || slug,
      url: `https://www.marcusmth.com/${slug}`,
      date: frontmatter.date || frontmatter.lastUpdated || new Date().toISOString(),
      chunkIndex: i,
      content: chunk,
      embedding,
    };

    // Store chunk
    await kv.set(`ai:chunk:${chunkId}`, JSON.stringify(chunkObj));

    chunkIds.push(chunkId);

    // Update inverted index
    for (const token of tokens) {
      if (!invertedIndexUpdates.has(token)) {
        invertedIndexUpdates.set(token, new Set());
      }
      invertedIndexUpdates.get(token)!.add(chunkId);
    }
  }

  // Update inverted index in KV
  for (const [token, chunkIdSet] of invertedIndexUpdates.entries()) {
    const existing = (await kv.smembers<string[]>(`ai:inv:${token}`)) || [];
    const existingSet = new Set(existing);
    chunkIdSet.forEach((id) => existingSet.add(id));
    // Add new chunk IDs to the set
    if (chunkIdSet.size > 0) {
      await kv.sadd(`ai:inv:${token}`, Array.from(chunkIdSet));
    }
  }

  // Store file hash
  await kv.set(`ai:filehash:${filePath}`, fileHash);

  console.log(`  ✓ Processed ${chunks.length} chunks for ${slug}`);
  return chunkIds;
}

/**
 * Main ingestion function
 */
async function ingest(changedOnly: boolean = false) {
  const postsDir = path.resolve(process.cwd(), "content/blog");
  const files = fs.readdirSync(postsDir);

  const mdFiles = files
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => path.join(postsDir, fileName));

  console.log(`Found ${mdFiles.length} markdown files`);
  console.log(`Mode: ${changedOnly ? "changed files only" : "full reindex"}\n`);

  // Collect all chunk IDs during processing
  const allChunkIds: string[] = [];
  let existingManifest: string[] = [];

  if (changedOnly) {
    // For changed-only mode, keep existing manifest
    const manifestData = await kv.get<string>("ai:manifest");
    existingManifest = manifestData ? JSON.parse(manifestData) : [];
  } else {
    // For full reindex, clear manifest
    await kv.del("ai:manifest");
  }

  // Process all files
  for (const filePath of mdFiles) {
    try {
      const fileChunkIds = await processPost(filePath, changedOnly);
      if (fileChunkIds) {
        allChunkIds.push(...fileChunkIds);
      }
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error);
    }
  }

  // Update manifest with all chunk IDs
  const finalManifest = changedOnly
    ? Array.from(new Set([...existingManifest, ...allChunkIds]))
    : allChunkIds;

  await kv.set("ai:manifest", JSON.stringify(finalManifest));
  console.log(`\n✓ Manifest updated with ${finalManifest.length} total chunks`);
  console.log("Ingestion complete!");
}

// Run if called directly
if (require.main === module) {
  const changedOnly = process.argv.includes("--changed-only");
  ingest(changedOnly)
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.error("Ingestion failed:", error);
      process.exit(1);
    });
}

export { ingest };
