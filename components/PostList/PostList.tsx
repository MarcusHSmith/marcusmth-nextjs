import { ReactElement, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import router from "next/router";
import Link from "next/link";
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
  const [sortedPosts, setSortedPosts] = useState<IPost[]>([]);
  useEffect(() => {
    const sortedList = posts
      .filter((p) => p.frontmatter.isPublished)
      .sort((a, b) => {
        const dateA = new Date(a.frontmatter.lastUpdated);
        const dateB = new Date(b.frontmatter.lastUpdated);
        return dateB.getTime() - dateA.getTime();
      });
    if (limit) {
      setSortedPosts(sortedList.slice(0, limit));
      return;
    }
    setSortedPosts(sortedList);
  }, [limit, posts]);

  let rootUrl = "/";
  if (category === "cheatsheet") {
    rootUrl = `/cheatsheet/`;
  }
  return (
    <div>
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
