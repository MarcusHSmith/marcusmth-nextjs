import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Pull a page's lastmod from its markdown frontmatter (lastUpdated, falling
// back to date), so the date moves whenever the content does.
function contentLastmod(relativePath: string, fallback: string): string {
  try {
    const file = fs.readFileSync(
      path.resolve(process.cwd(), relativePath),
      "utf-8"
    );
    const { data } = matter(file);
    const raw = data.lastUpdated || data.date;
    if (raw) return new Date(raw).toISOString().split("T")[0];
  } catch (error) {
    // fall through to fallback
  }
  return fallback;
}

async function generateSiteMap() {
  // Static lastmod dates so crawlers aren't told every page changed on every
  // request. Bump a date when that page's content actually changes.
  const readingLastmod = contentLastmod(
    "content/blog/reading.md",
    "2026-06-07"
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://www.marcusmth.com</loc>
        <lastmod>2026-06-07</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>https://www.marcusmth.com/cheatsheet</loc>
        <lastmod>2025-06-30</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>https://www.marcusmth.com/reading</loc>
        <lastmod>${readingLastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
      </url>
      <url>
        <loc>https://www.marcusmth.com/about</loc>
        <lastmod>2026-04-03</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
      <url>
        <loc>https://www.marcusmth.com/about/resume/engineering-manager</loc>
        <lastmod>2025-11-22</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
    </urlset>`;
}

export default async function sitemap(req, res) {
  const sitemap = await generateSiteMap();
  const version = new Date().getTime();
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600");
  res.setHeader("X-Version", version.toString());
  res.end(sitemap);

  return undefined;
}
