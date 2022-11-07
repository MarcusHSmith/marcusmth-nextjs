import { ReactElement, useMemo } from "react";
import Image from 'next/image';
import { HeaderBio } from "../HeaderBio/HeaderBio";
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
}

export function PostList({posts, category}: IProps): ReactElement {
    const sortedPosts = useMemo(() => {
        return posts.sort((a, b) => {
          const dateA = new Date(a.frontmatter.lastUpdated)
          const dateB = new Date(b.frontmatter.lastUpdated)
          return dateB.getUTCDate() - dateA.getUTCDate()
        })
      }, [posts])
      return (
        <div className='p-8'>
          <HeaderBio presenation='full'/>
          {sortedPosts.map(({ slug, frontmatter }) => {
            console.log(frontmatter)
            return (
            <div
              key={slug}
              className='border border-gray-200 m-2 rounded-l shadow-lg overflow-hidden flex flex-col'
              onClick={() => {
                switch(category) {
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
                    <span className='text-lg text-blue-500'>{frontmatter.title}</span>
                    <span className='text-xs'>{new Date(frontmatter.lastUpdated).toDateString()}</span>
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
          )})}
        </div>
      );
}