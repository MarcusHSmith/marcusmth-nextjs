import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const now = new Date();

  const status = {
    timestamp: now.toISOString(),
    status: "ok",
    sitemap: "https://www.marcusmth.com/sitemap.xml",
    robots: "https://www.marcusmth.com/robots.txt",
    server: "vercel",
    indexable: true,
    lastDeployment: process.env.VERCEL_GIT_COMMIT_SHA || "unknown",
    environment: process.env.NODE_ENV || "unknown",
    region: process.env.VERCEL_REGION || "unknown",
  };

  // Set cache headers to allow this to be cached but not for too long
  res.setHeader("Cache-Control", "public, max-age=300, s-maxage=300");
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(status);
}
