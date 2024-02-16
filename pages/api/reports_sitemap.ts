async function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <sitemap>
        <loc>https://www.marcusmth.com/reports_wework_paris_sitemap.xml</loc>
        <lastmod>2024-02-16</lastmod>
      </sitemap>
      <sitemap>
        <loc>https://www.marcusmth.com/reports_wework_berlin_sitemap.xml</loc>
        <lastmod>2024-02-16</lastmod>
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

  return {
    props: {},
  };
}
