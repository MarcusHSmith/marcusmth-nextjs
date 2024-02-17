import fs from "fs";
import path from "path";

export async function loadCheatsheets() {
  const dir = path.resolve(process.cwd(), "content/cheatsheet");
  const files = fs.readdirSync(dir);
  const cheatsheets = files.map((fileName) => {
    return fileName.replace(".md", "");
  });
  return cheatsheets;
}
