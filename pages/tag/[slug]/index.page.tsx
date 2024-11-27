import fs from "fs";
import matter from "gray-matter";
import { HeaderBio } from "../../../components/HeaderBio/HeaderBio";
import { PostItem } from "../../../components/PostItem/PostItem";
import { Tag } from "../../../components/TagList/TagList";

export async function getStaticPaths() {
  const allTags = new Set<string>();

  const blogFiles = fs.readdirSync("content/blog");
  blogFiles.forEach((fileName) => {
    const file = fs.readFileSync(`content/blog/${fileName}`, "utf-8");
    const { data: frontmatter } = matter(file);
    const tags = frontmatter.tags ?? [];
    tags.forEach((tag) => {
      allTags.add(tag.toLowerCase());
    });
  });

  const cheatsheetFiles = fs.readdirSync("content/cheatsheet");
  cheatsheetFiles.forEach((fileName) => {
    const file = fs.readFileSync(`content/cheatsheet/${fileName}`, "utf-8");
    const { data: frontmatter } = matter(file);
    const tags = frontmatter.tags ?? [];
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
    const tags: string[] = frontmatter.tags ?? [];
    if (tags.indexOf(slug) > -1) {
      cheatsheetLinks.push({
        title: frontmatter.title,
        slug: fileName.replace(".md", ""),
        description: frontmatter.description,
        lastUpdated: frontmatter.lastUpdated,
        featuredImage: frontmatter.featuredImage ?? null,
      });
    }
  });

  const blogLinks = [];
  const blogFiles = fs.readdirSync("content/blog");
  blogFiles.forEach((fileName) => {
    const file = fs.readFileSync(`content/blog/${fileName}`, "utf-8");
    const { data: frontmatter } = matter(file);
    const tags: string[] = frontmatter.tags ?? [];
    if (tags.indexOf(slug) > -1) {
      blogLinks.push({
        title: frontmatter.title,
        slug: fileName.replace(".md", ""),
        description: frontmatter.description,
        lastUpdated: frontmatter.lastUpdated,
        featuredImage: frontmatter.featuredImage ?? null,
      });
    }
  });
  return {
    props: {
      cheatsheetLinks,
      blogLinks,
      slug,
    },
  };
}

export default function TagPage({ cheatsheetLinks, blogLinks, slug }) {
  return (
    <div className="max-w-4xl mx-auto">
      <HeaderBio presentation="min" />
      <div className="flex flex-row items-center gap-2">
        <span className="font-bold text-lg">TAG:</span>
        <Tag name={slug} />
      </div>
      <hr />
      <span className="font-bold text-lg">Blog Posts</span>
      <hr />
      {blogLinks.map((link) => {
        return (
          <PostItem
            key={link.slug}
            slug={link.slug}
            title={link.title}
            description={link.description}
            rootUrl={"/"}
            featuredImage={link.featuredImage}
            lastUpdated={link.lastUpdated}
          />
        );
      })}
      <hr />
      <span className="font-bold text-lg">Cheatsheet Posts</span>
      <hr />
      {cheatsheetLinks.map((link) => {
        return (
          <PostItem
            key={link.slug}
            slug={link.slug}
            title={link.title}
            description={link.description}
            rootUrl={`/cheatsheet/`}
            featuredImage={link.featuredImage}
            lastUpdated={link.lastUpdated}
          />
        );
      })}
    </div>
  );
}
