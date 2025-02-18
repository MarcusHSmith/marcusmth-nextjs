import fs from "fs";
import matter from "gray-matter";
import { HomeLayout } from "../../components/HomeLayout/HomeLayout";
import { PostList } from "../../components/PostList/PostList";

export async function getStaticProps() {
  // Get all our posts
  const files = fs.readdirSync("content/cheatsheet");
  const posts = files.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const readFile = fs.readFileSync(`content/cheatsheet/${fileName}`, "utf-8");
    const { data: frontmatter } = matter(readFile);

    return {
      slug,
      frontmatter,
    };
  });
  return {
    props: {
      posts,
      frontmatter: {
        description:
          "Cheatsheet for software engineering, Solana, and web development. Includes keyboard shortcuts and productivity tips for VS Code, Terminal, and other developer tools. Also features YouTube tutorials and guides on blockchain development, web3, and modern web development practices.",
      },
    },
  };
}

export default function Home({ posts }) {
  return (
    <HomeLayout>
      <PostList posts={posts} category="cheatsheet" />
    </HomeLayout>
  );
}
