const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const blogDir = path.resolve(process.cwd(), "content/blog");

// Recursively find all .md files in blogDir and subdirectories
function findMarkdownFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Recursively search subdirectories
      files.push(...findMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }

  return files;
}

const markdownFiles = findMarkdownFiles(blogDir);
const tagCounts = new Map();

markdownFiles.forEach((filePath) => {
  const file = fs.readFileSync(filePath, "utf-8");
  const { data: frontmatter } = matter(file);
  const tags = frontmatter.tags ?? [];
  
  tags.forEach((tag) => {
    const normalizedTag = tag.toLowerCase();
    tagCounts.set(normalizedTag, (tagCounts.get(normalizedTag) || 0) + 1);
  });
});

// Convert to array and sort by count (descending), then by name
const sortedTags = Array.from(tagCounts.entries())
  .sort((a, b) => {
    // First sort by count (descending)
    if (b[1] !== a[1]) {
      return b[1] - a[1];
    }
    // If counts are equal, sort by name (ascending)
    return a[0].localeCompare(b[0]);
  });

console.log("\nBlog Post Tags Usage:\n");
console.log("Tag Name".padEnd(50) + "Count");
console.log("-".repeat(60));

sortedTags.forEach(([tag, count]) => {
  console.log(tag.padEnd(50) + count.toString());
});

console.log(`\nTotal unique tags: ${sortedTags.length}`);
console.log(`Total blog posts analyzed: ${markdownFiles.length}`);

