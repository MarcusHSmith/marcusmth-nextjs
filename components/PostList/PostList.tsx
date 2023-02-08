import { ReactElement, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import router from "next/router";
import Link from "next/link";

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
          <Link
            key={slug}
            href={`${rootUrl}${slug}`}
            style={{ textDecoration: "none" }}
          >
            <div className="border border-gray-200 my-2 rounded-l shadow-lg overflow-hidden flex flex-col">
              <div className="p-4 flex justify-between">
                <div className="flex flex-col">
                  <span className="font-bold text-lg text-blue-500">
                    {frontmatter.title}
                  </span>
                  <span className="font-light text-xs text-black">
                    {new Date(frontmatter.lastUpdated).toDateString()}
                  </span>
                  <span className="text-m text-black">
                    {frontmatter.description}
                  </span>
                </div>
                <div className="h-20 max-w-l w-20 relative">
                  {frontmatter.featuredImage && (
                    <Image
                      src={`/images/${frontmatter.featuredImage?.src}`}
                      alt={frontmatter.featuredImage?.alt}
                      fill={true}
                    />
                  )}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
