import { loadPosts } from "../../lib/load-posts";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import {
  READING_SERIES_PREFIX,
  READING_BASE_SLUG,
} from "../../utils/constants";

async function generateSiteMap() {
  const today = new Date().toISOString().split("T")[0];
  const posts = await loadPosts();

  // Also load reading series files from subfolder
  const readingDir = path.resolve(process.cwd(), "content/blog/reading");
  let readingPosts: string[] = [];
  try {
    const readingFiles = fs.readdirSync(readingDir);
    readingPosts = readingFiles
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => fileName.replace(".md", ""));
  } catch (error) {
    // Reading directory doesn't exist, skip
  }

  const allPosts = [...posts, ...readingPosts];

  const postsWithDates = allPosts.map((slug) => {
    try {
      // Check if this is a reading series file (in subfolder)
      const readingFilePath = path.resolve(
        process.cwd(),
        `content/blog/reading/${slug}.md`
      );
      const isReadingSeries = fs.existsSync(readingFilePath);

      const filePath = isReadingSeries
        ? readingFilePath
        : path.resolve(process.cwd(), `content/blog/${slug}.md`);
      const file = fs.readFileSync(filePath, "utf-8");
      const { data: frontmatter } = matter(file);

      // Transform reading series slugs to reading/{series}
      let urlSlug = slug;
      let lastmod;

      if (isReadingSeries) {
        urlSlug = `${READING_BASE_SLUG}/${slug}`;
        lastmod = frontmatter.lastUpdated
          ? frontmatter.lastUpdated.split("T")[0]
          : today;
      } else {
        urlSlug = slug;
        lastmod = frontmatter.lastUpdated.split("T")[0];
      }

      return { slug: urlSlug, lastmod };
    } catch (error) {
      // Fallback: assume it's a regular post
      return { slug, lastmod: today };
    }
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${postsWithDates
  .map(({ slug, lastmod }) => {
    return `  <url>
    <loc>https://www.marcusmth.com/${slug}</loc>
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
