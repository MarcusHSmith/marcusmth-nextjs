import { ReactElement, useEffect, useMemo, useState } from "react";
import Image from 'next/image';
import router from "next/router";

export interface IPost {
  slug: string;
  frontmatter: {
    [key: string]: any;
  };
}

interface IProps {
  posts: IPost[]
  category: 'blog' | 'cheatsheet'
  limit?: number
}

export function PostList({ posts, category, limit = undefined }: IProps): ReactElement {
  const [sortedPosts, setSortedPosts] = useState<IPost[]>([])
  useEffect(() => {
    const sortedList = posts.sort((a, b) => {
      const dateA = new Date(a.frontmatter.lastUpdated)
      const dateB = new Date(b.frontmatter.lastUpdated)
      return dateB.getTime() - dateA.getTime()
    })
    if (limit) {
      setSortedPosts(sortedList.slice(0, limit))
      return
    }
    setSortedPosts(sortedList)
  }, [limit, posts])
  return (
    <div>
      {sortedPosts.map(({ slug, frontmatter }) => {
        return (
          <div
            key={slug}
            className='border border-gray-200 my-2 rounded-l shadow-lg overflow-hidden flex flex-col'
            onClick={() => {
              switch (category) {
                case 'blog':
                  router.push(`/${slug}`)
                  return;
                case 'cheatsheet':
                  router.push(`/cheatsheet/${slug}`)
                  return;
              }
            }}
          >
            <div className='p-4 flex justify-between'>
              <div className='flex flex-col'>
                <span className='font-bold text-lg text-blue-500'>{frontmatter.title}</span>
                <span className='font-light text-xs'>{new Date(frontmatter.lastUpdated).toDateString()}</span>
                <span className='text-m'>{frontmatter.description}</span>
              </div>
              <div className='h-20 max-w-l w-20 relative'>
                {frontmatter.featuredImage && (<Image
                  src={`/images/${frontmatter.featuredImage?.src}`}
                  alt={frontmatter.featuredImage?.alt}
                  fill={true}
                />)}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  );
}