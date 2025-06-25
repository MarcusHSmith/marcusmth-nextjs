import { loadPosts } from "../../lib/load-posts";
import fs from "fs";
import path from "path";

async function generateSiteMap() {
  const posts = await loadPosts();
  const postsWithDates = posts.map((slug) => {
    try {
      const filePath = path.resolve(process.cwd(), `content/blog/${slug}.md`);
      const stats = fs.statSync(filePath);
      const lastmod = stats.mtime.toISOString().split("T")[0];
      return { slug, lastmod };
    } catch (error) {
      const today = new Date().toISOString().split("T")[0];
      return { slug, lastmod: today };
    }
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${postsWithDates
  .map(({ slug, lastmod }) => {
    return `  <url>
    <loc>https://www.marcusmth.com/${slug}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  })
  .join("\n")}
</urlset>`;
}

export default async function sitemap(req, res) {
  const sitemap = await generateSiteMap();
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600");
  res.setHeader("X-Sitemap-Version", Date.now().toString());
  res.end(sitemap);

  return undefined;
}
