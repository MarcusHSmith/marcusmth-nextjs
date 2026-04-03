import fs from "fs";
import matter from "gray-matter";
import path from "path";

type ContentEntry = {
  slug: string;
  frontmatter: Record<string, any>;
};

function loadContentEntries(directory: string): ContentEntry[] {
  const dir = path.resolve(process.cwd(), directory);
  const files = fs.readdirSync(dir).filter((fileName) => fileName.endsWith(".md"));

  return files.map((fileName) => {
    const file = fs.readFileSync(path.join(dir, fileName), "utf-8");
    const { data: frontmatter } = matter(file);

    return {
      slug: fileName.replace(".md", ""),
      frontmatter,
    };
  });
}

function sortByLastUpdated(entries: ContentEntry[]): ContentEntry[] {
  return entries.sort((a, b) => {
    return (
      new Date(b.frontmatter.lastUpdated).getTime() -
      new Date(a.frontmatter.lastUpdated).getTime()
    );
  });
}

export function loadPublishedPosts(): ContentEntry[] {
  return sortByLastUpdated(
    loadContentEntries("content/blog").filter(
      (entry) => entry.frontmatter.isPublished
    )
  );
}

export function loadCheatsheets(): ContentEntry[] {
  return sortByLastUpdated(loadContentEntries("content/cheatsheet"));
}

export function buildLlmsTxt(): string {
  const posts = loadPublishedPosts();
  const cheatsheets = loadCheatsheets();

  const lines: string[] = [
    "# Marcus Smith (marcusmth.com)",
    "",
    "> Personal site of Marcus Smith, an engineering manager, software engineer, and founder. The site contains software engineering writing, startup notes, and developer cheatsheets.",
    "",
    "## Summary",
    "",
    "- Primary content is statically rendered HTML generated from local Markdown files.",
    "- Main topics include React, iOS development, engineering leadership, startups, and developer tooling.",
    "- The site also publishes an RSS feed and machine-readable index pages.",
    "",
    "## Key Pages",
    "",
    "- [Home](https://www.marcusmth.com/): Blog post index",
    "- [About](https://www.marcusmth.com/about): About Marcus Smith",
    "- [Blog](https://www.marcusmth.com/blog): All blog posts",
    "- [Cheatsheets](https://www.marcusmth.com/cheatsheet): Quick-reference cheatsheets",
    "- [RSS Feed](https://www.marcusmth.com/feed.xml): RSS feed with full post content",
    "- [LLMs Full](https://www.marcusmth.com/llms-full.txt): Expanded machine-readable site listing",
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

  return `${lines.join("\n")}\n`;
}

export function buildLlmsFullTxt(): string {
  const posts = loadPublishedPosts();
  const cheatsheets = loadCheatsheets();

  const lines: string[] = [
    "# Marcus Smith Full Site Index",
    "",
    "This site is primarily static, server-rendered content generated from Markdown.",
    "",
    "## Blog",
    "",
  ];

  for (const post of posts) {
    lines.push(`### ${post.frontmatter.title || post.slug}`);
    lines.push(`- URL: https://www.marcusmth.com/${post.slug}`);
    if (post.frontmatter.lastUpdated) {
      lines.push(`- Last updated: ${post.frontmatter.lastUpdated}`);
    }
    if (post.frontmatter.tags?.length) {
      lines.push(`- Tags: ${post.frontmatter.tags.join(", ")}`);
    }
    if (post.frontmatter.description) {
      lines.push(`- Summary: ${post.frontmatter.description}`);
    }
    lines.push("");
  }

  lines.push("## Cheatsheets", "");

  for (const sheet of cheatsheets) {
    lines.push(`### ${sheet.frontmatter.title || sheet.slug}`);
    lines.push(`- URL: https://www.marcusmth.com/cheatsheet/${sheet.slug}`);
    if (sheet.frontmatter.lastUpdated) {
      lines.push(`- Last updated: ${sheet.frontmatter.lastUpdated}`);
    }
    if (sheet.frontmatter.tags?.length) {
      lines.push(`- Tags: ${sheet.frontmatter.tags.join(", ")}`);
    }
    if (sheet.frontmatter.description) {
      lines.push(`- Summary: ${sheet.frontmatter.description}`);
    }
    lines.push("");
  }

  return `${lines.join("\n")}\n`;
}
