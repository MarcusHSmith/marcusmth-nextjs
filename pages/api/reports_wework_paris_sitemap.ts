async function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://www.marcusmth.com/reports/wework/paris</loc>
        <lastmod>2024-02-16</lastmod>
      </url>
    </urlset>
 `;
}

export default async function sitemap(req, res) {
  const sitemap = await generateSiteMap();
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-control", "stale-while-revalidate, s-maxage=3600");
  res.end(sitemap);

  return {
    props: {},
  };
}
