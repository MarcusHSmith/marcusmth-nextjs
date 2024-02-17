import fs from "fs";

export async function loadPosts() {
  const files = fs.readdirSync("content/blog");
  const posts = files.map((fileName) => {
    return fileName.replace(".md", "");
  });
  return posts;
}
