import { ReactElement, useMemo } from "react";
import { PostItem } from "../PostItem/PostItem";

export interface IPost {
  slug: string;
  frontmatter: {
    [key: string]: any;
  };
}

interface IProps {
  posts: IPost[];
  category: "blog" | "cheatsheet";
  limit?: number;
}

export function PostList({
  posts,
  category,
  limit = undefined,
}: IProps): ReactElement {
  const sortedPosts = useMemo(() => {
    const sorted = posts
      .filter((p) => p.frontmatter.isPublished)
      .sort((a, b) => {
        const dateA = new Date(a.frontmatter.lastUpdated);
        const dateB = new Date(b.frontmatter.lastUpdated);
        return dateB.getTime() - dateA.getTime();
      });
    return limit ? sorted.slice(0, limit) : sorted;
  }, [limit, posts]);

  let rootUrl = "/";
  if (category === "cheatsheet") {
    rootUrl = `/cheatsheet/`;
  }
  return (
    <div className="space-y-6">
      {sortedPosts.map(({ slug, frontmatter }) => {
        return (
          <PostItem
            key={slug}
            slug={slug}
            rootUrl={rootUrl}
            title={frontmatter.title}
            description={frontmatter.description}
            lastUpdated={frontmatter.lastUpdated}
            featuredImage={frontmatter.featuredImage}
          />
        );
      })}
    </div>
  );
}
