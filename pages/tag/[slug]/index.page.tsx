import fs from "fs";
import matter from "gray-matter";
import PostContent from "../../../components/PostContent/PostContent";
import router from "next/router";

export async function getStaticPaths() {
  const allTags = new Set<string>();

  const blogFiles = fs.readdirSync("content/blog");
  blogFiles.forEach((fileName) => {
    const file = fs.readFileSync(`content/blog/${fileName}`, "utf-8");
    const { data: frontmatter } = matter(file);
    const tags = frontmatter.tags;
    tags.forEach((tag) => {
      allTags.add(tag.toLowerCase());
    });
  });

  const cheatsheetFiles = fs.readdirSync("content/cheatsheet");
  cheatsheetFiles.forEach((fileName) => {
    const file = fs.readFileSync(`content/cheatsheet/${fileName}`, "utf-8");
    const { data: frontmatter } = matter(file);
    const tags = frontmatter.tags;
    tags.forEach((tag) => {
      allTags.add(tag.toLowerCase());
    });
  });

  const paths = Array.from(allTags).map((tag) => ({
    params: {
      slug: tag,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const cheatsheetLinks = [];
  const cheatsheetFiles = fs.readdirSync("content/cheatsheet");
  cheatsheetFiles.forEach((fileName) => {
    const file = fs.readFileSync(`content/cheatsheet/${fileName}`, "utf-8");
    const { data: frontmatter } = matter(file);
    const tags: string[] = frontmatter.tags;
    if (tags.indexOf(slug) > -1) {
      cheatsheetLinks.push({
        title: frontmatter.title,
        slug: fileName.replace(".md", ""),
      });
    }
  });

  const blogLinks = [];
  const blogFiles = fs.readdirSync("content/blog");
  blogFiles.forEach((fileName) => {
    const file = fs.readFileSync(`content/blog/${fileName}`, "utf-8");
    const { data: frontmatter } = matter(file);
    const tags: string[] = frontmatter.tags;
    if (tags.indexOf(slug) > -1) {
      blogLinks.push({
        title: frontmatter.title,
        slug: fileName.replace(".md", ""),
      });
    }
  });
  return {
    props: {
      cheatsheetLinks: cheatsheetLinks,
      blogLinks: blogLinks,
    },
  };
}

export default function TagPage({ cheatsheetLinks, blogLinks }) {
  return (
    <div>
      <span className="font-bold text-lg">ALL TAGS</span>
      <hr />
      <span className="font-bold text-lg">Blog Posts</span>
      <hr />
      {blogLinks.map((link) => {
        return (
          <button key={link.slug} onClick={() => router.push(`/${link.slug}`)}>
            {link.title}
          </button>
        );
      })}
      <hr />
      <span className="font-bold text-lg">Cheatsheet Posts</span>
      <hr />
      {cheatsheetLinks.map((link) => {
        return (
          <button
            key={link.slug}
            onClick={() => router.push(`/cheatsheet/${link.slug}`)}
          >
            {link.title}
          </button>
        );
      })}
    </div>
  );
}
