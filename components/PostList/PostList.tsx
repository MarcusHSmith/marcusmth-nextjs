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

  // The LCP candidate is the first card that actually renders an image, which
  // is not always the first card -- plenty of posts have no featuredImage.
  const lcpSlug = useMemo(
    () => sortedPosts.find((p) => p.frontmatter.featuredImage)?.slug,
    [sortedPosts]
  );

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
            tags={frontmatter.tags}
            // Only the LCP image is eager; every other card lazy-loads.
            priority={slug === lcpSlug}
          />
        );
      })}
    </div>
  );
}
