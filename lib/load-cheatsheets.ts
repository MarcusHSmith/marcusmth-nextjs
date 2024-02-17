import fs from "fs";

export async function loadCheatsheets() {
  const files = fs.readdirSync("content/cheatsheet");
  const cheatsheets = files.map((fileName) => {
    return fileName.replace(".md", "");
  });
  return cheatsheets;
}
