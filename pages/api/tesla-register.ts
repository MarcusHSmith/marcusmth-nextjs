import { NextApiRequest, NextApiResponse } from "next";

// One-time helper for Tesla Fleet API partner registration.
// Receives the developer app's client_id and client_secret, exchanges them
// for a partner token, and registers www.marcusmth.com. Nothing is stored
// or logged. This file is removed right after registration succeeds.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.status(405).json({ error: "POST only" });
    return;
  }
  const client_id = (req.body?.client_id || "").toString().trim();
  const client_secret = (req.body?.client_secret || "").toString().trim();
  if (!client_id || !client_secret) {
    res.status(400).json({ error: "client_id and client_secret required" });
    return;
  }
  const tokenParams = new URLSearchParams({
    grant_type: "client_credentials",
    client_id,
    client_secret,
    audience: "https://fleet-api.prd.na.vn.cloud.tesla.com",
    scope:
      "openid vehicle_device_data vehicle_location vehicle_cmds vehicle_charging_cmds",
  });
  const tokenResp = await fetch(
    "https://fleet-auth.prd.vn.cloud.tesla.com/oauth2/v3/token",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: tokenParams.toString(),
    }
  );
  const tokenJson: any = await tokenResp.json().catch(() => ({}));
  if (!tokenResp.ok || !tokenJson.access_token) {
    res.status(200).json({
      token_ok: false,
      token_status: tokenResp.status,
      token_error: tokenJson.error || null,
    });
    return;
  }
  const regResp = await fetch(
    "https://fleet-api.prd.na.vn.cloud.tesla.com/api/1/partner_accounts",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenJson.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ domain: "www.marcusmth.com" }),
    }
  );
  const regJson: any = await regResp.json().catch(() => ({}));
  res.status(200).json({
    token_ok: true,
    register_status: regResp.status,
    register_response: regJson,
  });
}
