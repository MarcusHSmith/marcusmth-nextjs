import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { markdownToHtml } from "./markdown";

export async function loadPosts() {
  const dir = path.resolve(process.cwd(), "content/blog");
  const files = fs.readdirSync(dir);
  const posts = files.map((fileName) => {
    return fileName.replace(".md", "");
  });
  return posts;
}

export async function loadFullPosts() {
  const dir = path.resolve(process.cwd(), "content/blog");
  const files = fs.readdirSync(dir);
  const posts = files.map((fileName) => {
    const file = fs.readFileSync(`content/blog/${fileName}`, "utf-8");
    const { data: frontmatter, content } = matter(file);
    const htmlContent = markdownToHtml(content);
    return {
      slug: fileName.replace(".md", ""),
      frontmatter,
      content: htmlContent,
    };
  });

  return posts;
}
