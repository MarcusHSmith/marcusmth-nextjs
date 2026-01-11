import { streamText } from "ai";
import { openai as openaiProvider } from "ai/openai";
import { z } from "zod";
import { retrieveTopChunks } from "../../../lib/retrieval";
import { kv } from "../../../lib/kv";

// Request schema
const writeRequestSchema = z.object({
  topic: z.string().min(1).max(500),
  audience: z.string().optional(),
  tone: z.string().optional(),
  length: z.enum(["short", "medium", "long"]).optional(),
});

// Rate limiting: 10 requests per hour per IP
async function checkRateLimit(ip: string): Promise<boolean> {
  const hour = new Date().toISOString().slice(0, 13); // YYYY-MM-DDTHH
  const key = `ai:rl:${ip}:${hour}`;
  const count = (await kv.get<number>(key)) || 0;

  if (count >= 10) {
    return false;
  }

  await kv.incr(key);
  await kv.expire(key, 3600); // Expire after 1 hour
  return true;
}

// Get max tokens based on length
function getMaxTokens(length?: string): number {
  switch (length) {
    case "short":
      return 1000;
    case "long":
      return 3000;
    case "medium":
    default:
      return 2000;
  }
}

export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Check rate limit
    const allowed = await checkRateLimit(ip);
    if (!allowed) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
        {
          status: 429,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validated = writeRequestSchema.parse(body);

    // Retrieve relevant chunks
    const { chunks, sources } = await retrieveTopChunks(validated.topic, 12);

    if (chunks.length === 0) {
      return new Response(
        JSON.stringify({ error: "No relevant content found. Please try a different topic." }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Build context from retrieved chunks
    const contextSections = chunks
      .map(
        (item, idx) =>
          `[Excerpt ${idx + 1} from "${item.chunk.title}"]:\n${item.chunk.content}`
      )
      .join("\n\n");

    // Build sources list
    const sourcesList = sources
      .map((source) => `- ${source.title}: ${source.url}`)
      .join("\n");

    // Build prompt
    const toneInstruction = validated.tone
      ? ` Use a ${validated.tone} tone.`
      : "";
    const audienceInstruction = validated.audience
      ? ` Write for an audience of ${validated.audience}.`
      : "";

    const prompt = `You are Marcus, writing a blog post for marcusmth.com. Write a blog post about: ${validated.topic}${toneInstruction}${audienceInstruction}

IMPORTANT GUIDELINES:
- Write in Marcus's style based on the excerpts below
- Only use information from the provided excerpts - do not invent specific facts, numbers, or claims
- Include a compelling title
- Write an engaging introduction
- Use clear headings to organize content
- Write a thoughtful conclusion
- At the end, include a "Sources consulted" section listing the URLs of the sources used

Here are relevant excerpts from Marcus's existing blog posts:

${contextSections}

Now write the blog post:`;

    // Stream response using Vercel AI SDK
    const result = await streamText({
      model: openaiProvider("gpt-4o-mini"),
      prompt,
      maxTokens: getMaxTokens(validated.length),
      temperature: 0.7,
    });

    // Return streaming response
    return result.toDataStreamResponse({
      headers: {
        "X-Sources": JSON.stringify(sources),
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({ error: "Invalid request", details: error.errors }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    console.error("Error in write endpoint:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
