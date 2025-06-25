async function generateSiteMap() {
  const today = new Date().toISOString().split("T")[0];

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://www.marcusmth.com/default_sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://www.marcusmth.com/posts_sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://www.marcusmth.com/cheatsheets_sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://www.marcusmth.com/tags_sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://www.marcusmth.com/reports_wework_paris_sitemap.xml</loc>
    <lastmod>2024-02-21</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://www.marcusmth.com/reports_wework_berlin_sitemap.xml</loc>
    <lastmod>2024-02-21</lastmod>
  </sitemap>
</sitemapindex>`;
}

export default async function handler(req, res) {
  const sitemap = await generateSiteMap();
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600");
  res.setHeader("X-Sitemap-Version", new Date().toISOString());
  res.end(sitemap);

  return undefined;
}
