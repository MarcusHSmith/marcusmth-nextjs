import fs from "fs";
import path from "path";

export async function loadPosts() {
  const dir = path.resolve(process.cwd(), "content/blog");
  const files = fs.readdirSync(dir);
  const posts = files.map((fileName) => {
    return fileName.replace(".md", "");
  });
  return posts;
}
