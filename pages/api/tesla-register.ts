import { NextApiRequest, NextApiResponse } from "next";

// The one-time Tesla Fleet API partner registration completed on
// 2026-10-28. This endpoint is permanently closed.
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Cache-Control", "no-store");
  res.status(410).json({ error: "gone" });
}
