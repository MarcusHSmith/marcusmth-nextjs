import fs from "fs";
import matter from "gray-matter";
import path from "path";

export async function loadTags() {
  const allTags = new Set<string>();

  const blogDir = path.resolve(process.cwd(), "content/blog");
  const blogFiles = fs.readdirSync(blogDir);
  blogFiles.forEach((fileName) => {
    const file = fs.readFileSync(`content/blog/${fileName}`, "utf-8");
    const { data: frontmatter } = matter(file);
    const tags = frontmatter.tags;
    tags.forEach((tag) => {
      allTags.add(tag.toLowerCase());
    });
  });

  const cheatsheetDir = path.resolve(process.cwd(), "content/cheatsheet");
  const cheatsheetFiles = fs.readdirSync(cheatsheetDir);
  cheatsheetFiles.forEach((fileName) => {
    const file = fs.readFileSync(`content/cheatsheet/${fileName}`, "utf-8");
    const { data: frontmatter } = matter(file);
    const tags = frontmatter.tags;
    tags.forEach((tag) => {
      allTags.add(tag.toLowerCase());
    });
  });

  return Array.from(allTags);
}
