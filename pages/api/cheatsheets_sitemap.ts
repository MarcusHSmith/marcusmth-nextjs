import { loadCheatsheets } from "../../lib/load-cheatsheets";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

async function generateSiteMap() {
  const posts = await loadCheatsheets();
  const today = new Date().toISOString().split("T")[0];

  // Filter to only include published cheatsheets
  const publishedPosts = posts.filter((slug) => {
    try {
      const filePath = path.resolve(
        process.cwd(),
        `content/cheatsheet/${slug}.md`
      );
      const file = fs.readFileSync(filePath, "utf-8");
      const { data: frontmatter } = matter(file);
      return frontmatter.isPublished !== false;
    } catch (error) {
      return false;
    }
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${publishedPosts
  .map((slug) => {
    return `  <url>
    <loc>https://www.marcusmth.com/cheatsheet/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
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
