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
  const postsWithDates = posts.map((slug) => {
    try {
      const filePath = path.resolve(process.cwd(), `content/blog/${slug}.md`);
      const file = fs.readFileSync(filePath, "utf-8");
      const { data: frontmatter } = matter(file);

      // Transform reading series slugs from reading-{series} to reading/{series}
      let urlSlug = slug;
      let lastmod;

      if (
        slug.startsWith(READING_SERIES_PREFIX) &&
        slug !== READING_BASE_SLUG
      ) {
        urlSlug = `${READING_BASE_SLUG}/${slug.replace(
          READING_SERIES_PREFIX,
          ""
        )}`;
        // Use today's date for reading series pages
        lastmod = today;
      } else {
        lastmod = frontmatter.lastUpdated.split("T")[0];
      }

      return { slug: urlSlug, lastmod };
    } catch (error) {
      // Apply the same transformation for error cases
      let urlSlug = slug;
      if (
        slug.startsWith(READING_SERIES_PREFIX) &&
        slug !== READING_BASE_SLUG
      ) {
        urlSlug = `${READING_BASE_SLUG}/${slug.replace(
          READING_SERIES_PREFIX,
          ""
        )}`;
      }

      return { slug: urlSlug, lastmod: today };
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
