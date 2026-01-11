import { kv } from "@vercel/kv";

// Server-only KV client helper
// This file should only be imported in server-side code (API routes, server components, etc.)

// Check for REST API credentials (preferred for serverless)
if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
  // Fallback: Check if REDIS_URL is available (for direct Redis connections)
  if (!process.env.REDIS_URL) {
    throw new Error(
      "Missing required KV environment variables. Need either:\n" +
      "  - KV_REST_API_URL and KV_REST_API_TOKEN (preferred)\n" +
      "  - OR REDIS_URL\n\n" +
      "Get REST API credentials from your Upstash dashboard: https://console.upstash.com/"
    );
  }
}

export { kv };
