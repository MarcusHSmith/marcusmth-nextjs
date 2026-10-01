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

/**
 * How many leading cards can still be above the fold. A card is ~180px tall,
 * so the second is the last one reachable on a short viewport.
 */
const PRIORITY_WINDOW = 2;

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
  // Bounded to the cards plausibly above the fold: if the first image is
  // further down than that, the LCP is text and preloading an off-screen
  // image would only compete with it, so nothing gets priority.
  const lcpSlug = useMemo(() => {
    const first = sortedPosts.findIndex((p) => p.frontmatter.featuredImage);
    return first > -1 && first < PRIORITY_WINDOW
      ? sortedPosts[first].slug
      : undefined;
  }, [sortedPosts]);

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
