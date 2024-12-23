import { loadCheatsheets } from "../../lib/load-cheatsheets";

async function generateSiteMap() {
  const posts = await loadCheatsheets();

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${posts.map((slug) => {
      return `
      <url>
        <loc>https://marcusmth.com/cheatsheet/${slug}/</loc>
        <lastmod>2024-10-25</lastmod>
      </url>
    `;
    })}
    </urlset>
 `;
}

export default async function sitemap(req, res) {
  const sitemap = await generateSiteMap();
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-control", "no-store, no-cache, must-revalidate");
  res.setHeader("X-Sitemap-Version", Date.now().toString());
  res.end(sitemap);

  return undefined;
}
