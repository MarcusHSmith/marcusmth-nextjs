import fs from "fs";
import matter from "gray-matter";
import PostContent from "../../../components/PostContent/PostContent";
import { markdownToHtml } from "../../../lib/markdown";

export async function getStaticPaths() {
  const files = fs.readdirSync("content/blog");
  const readingFiles = files.filter(
    (fileName) => fileName.startsWith("reading-") && fileName !== "reading.md"
  );
  const paths = readingFiles.map((fileName) => ({
    params: {
      slug: fileName.replace("reading-", "").replace(".md", ""),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const fileName = fs.readFileSync(`content/blog/reading-${slug}.md`, "utf-8");
  const { data: frontmatter, content } = matter(fileName);
  const htmlContent = markdownToHtml(content);
  return {
    props: {
      frontmatter,
      content,
      htmlContent,
    },
  };
}

export default function PostPage({ frontmatter, content, htmlContent }) {
  return (
    <PostContent
      frontmatter={frontmatter}
      content={content}
      htmlContent={htmlContent}
    />
  );
}
