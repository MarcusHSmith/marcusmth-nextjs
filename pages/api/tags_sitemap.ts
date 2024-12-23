import { loadTags } from "../../lib/load-tags";

async function generateSiteMap() {
  const tags = await loadTags();
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${(tags || [])
        .map(
          (slug) => `
        <url>
          <loc>https://marcusmth.com/tag/${slug}/</loc>
          <lastmod>2024-10-25</lastmod>
        </url>
      `
        )
        .join("")}
    </urlset>`;
}

export default async function sitemap(req, res) {
  const sitemap = await generateSiteMap();
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-control", "no-cache, no-store, must-revalidate");
  res.setHeader("X-Sitemap-Version", Date.now().toString());
  res.end(sitemap);

  return undefined;
}
