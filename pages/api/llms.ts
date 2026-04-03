import fs from "fs";
import matter from "gray-matter";
import path from "path";

function loadPublishedPosts() {
  const dir = path.resolve(process.cwd(), "content/blog");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  return files
    .map((fileName) => {
      const file = fs.readFileSync(`content/blog/${fileName}`, "utf-8");
      const { data: frontmatter } = matter(file);
      return { slug: fileName.replace(".md", ""), frontmatter };
    })
    .filter((p) => p.frontmatter.isPublished)
    .sort((a, b) => {
      return (
        new Date(b.frontmatter.lastUpdated).getTime() -
        new Date(a.frontmatter.lastUpdated).getTime()
      );
    });
}

function loadCheatsheets() {
  const dir = path.resolve(process.cwd(), "content/cheatsheet");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  return files
    .map((fileName) => {
      const file = fs.readFileSync(`content/cheatsheet/${fileName}`, "utf-8");
      const { data: frontmatter } = matter(file);
      return { slug: fileName.replace(".md", ""), frontmatter };
    })
    .sort((a, b) => {
      return (
        new Date(b.frontmatter.lastUpdated).getTime() -
        new Date(a.frontmatter.lastUpdated).getTime()
      );
    });
}

export default async function llms(req, res) {
  const posts = loadPublishedPosts();
  const cheatsheets = loadCheatsheets();

  const lines: string[] = [
    "# Marcus Smith (marcusmth.com)",
    "",
    "> Personal site of Marcus Smith — Engineering Manager, software engineer, and founder. Contains blog posts on software engineering, iOS development, React, and startup topics, plus reference cheatsheets.",
    "",
    "## Key Pages",
    "",
    "- [Home](https://www.marcusmth.com/): Blog post index",
    "- [About](https://www.marcusmth.com/about): About Marcus Smith",
    "- [Blog](https://www.marcusmth.com/blog): All blog posts",
    "- [Cheatsheets](https://www.marcusmth.com/cheatsheet): Quick-reference cheatsheets",
    "- [RSS Feed](https://www.marcusmth.com/feed.xml): RSS feed with full post content",
    "",
    "## Blog Posts",
    "",
  ];

  for (const post of posts) {
    const title = post.frontmatter.title || post.slug;
    const description = post.frontmatter.description
      ? `: ${post.frontmatter.description}`
      : "";
    lines.push(
      `- [${title}](https://www.marcusmth.com/${post.slug})${description}`
    );
  }

  lines.push("", "## Cheatsheets", "");

  for (const sheet of cheatsheets) {
    const title = sheet.frontmatter.title || sheet.slug;
    const description = sheet.frontmatter.description
      ? `: ${sheet.frontmatter.description}`
      : "";
    lines.push(
      `- [${title}](https://www.marcusmth.com/cheatsheet/${sheet.slug})${description}`
    );
  }

  const content = lines.join("\n") + "\n";

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600");
  res.end(content);
}
