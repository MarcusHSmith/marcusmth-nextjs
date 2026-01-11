import { kv } from "@vercel/kv";

// Server-only KV client helper
// This file should only be imported in server-side code (API routes, server components, etc.)

if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
  throw new Error(
    "Missing required KV environment variables: KV_REST_API_URL and KV_REST_API_TOKEN"
  );
}

export { kv };
