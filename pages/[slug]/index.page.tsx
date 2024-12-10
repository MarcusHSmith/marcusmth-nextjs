import fs from "fs";
import matter from "gray-matter";
import PostContent from "../../components/PostContent/PostContent";

export async function getStaticPaths() {
  try {
    const files = fs.readdirSync("content/blog");
    const paths = files
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => ({
        params: {
          slug: fileName.replace(".md", ""),
        },
      }));

    console.log("Generated paths:", paths); // For debugging

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.error("Error in getStaticPaths:", error);
    return {
      paths: [],
      fallback: false,
    };
  }
}

export async function getStaticProps({ params: { slug } }) {
  try {
    const fileName = fs.readFileSync(`content/blog/${slug}.md`, "utf-8");
    const { data: frontmatter, content } = matter(fileName);

    return {
      props: {
        frontmatter,
        content,
      },
      // Add revalidation time
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    return { notFound: true };
  }
}

export default function PostPage({ frontmatter, content }) {
  return <PostContent frontmatter={frontmatter} content={content} />;
}
