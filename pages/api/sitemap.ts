async function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <sitemap>
        <loc>https://marcusmth.com/default_sitemap.xml</loc>
        <lastmod>2024-10-25</lastmod>
      </sitemap>
      <sitemap>
        <loc>https://marcusmth.com/posts_sitemap.xml</loc>
        <lastmod>2024-10-25</lastmod>
      </sitemap>
      <sitemap>
        <loc>https://marcusmth.com/cheatsheets_sitemap.xml</loc>
        <lastmod>2024-10-25</lastmod>
      </sitemap>
      <sitemap>
        <loc>https://marcusmth.com/tags_sitemap.xml</loc>
        <lastmod>2024-10-25</lastmod>
    </sitemap>
      <sitemap>
        <loc>https://marcusmth.com/reports_wework_paris_sitemap.xml</loc>
        <lastmod>2024-02-21</lastmod>
      </sitemap>
      <sitemap>
        <loc>https://marcusmth.com/reports_wework_berlin_sitemap.xml</loc>
        <lastmod>2024-02-21</lastmod>
      </sitemap>
    </sitemapindex>
   `;
}

export default async function handler(req, res) {
  const sitemap = await generateSiteMap();
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-control", "stale-while-revalidate, s-maxage=3600");
  res.end(sitemap);

  return undefined;
}
