import { loadPosts } from "../../lib/load-posts";

async function generateSiteMap() {
  const posts = await loadPosts();
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${posts.map((slug) => {
      return `
      <url>
        <loc>https://marcusmth.com/${slug}/</loc>
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
  res.setHeader("Cache-control", "stale-while-revalidate, s-maxage=3600");
  res.end(sitemap);

  return undefined;
}
