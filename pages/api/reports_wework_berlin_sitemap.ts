async function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://www.marcusmth.com/best-wework-office-in-berlin</loc>
        <lastmod>2024-02-21</lastmod>
      </url>
    </urlset>
 `;
}

export default async function sitemap(req, res) {
  const sitemap = await generateSiteMap();
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-control", "no-store, no-cache, must-revalidate");
  res.setHeader("X-Sitemap-Version", new Date().toISOString());
  res.end(sitemap);

  return undefined;
}
