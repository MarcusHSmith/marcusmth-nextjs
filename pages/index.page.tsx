import fs from 'fs';
import matter from 'gray-matter';
import { ReactElement } from 'react';
import { HomeLayout } from '../components/HomeLayout/HomeLayout';
import { PostList } from '../components/PostList/PostList';
import Image from 'next/image';
import router from 'next/router';

export async function getStaticProps() {
  // Get all our posts
  const files = fs.readdirSync('content/blog');
  const posts = files.map((fileName) => {
    const slug = fileName.replace('.md', '');
    const readFile = fs.readFileSync(`content/blog/${fileName}`, 'utf-8');
    const { data: frontmatter } = matter(readFile)
    
    return {
      slug,
      frontmatter,
    };
});
return {
  props: {
    posts,
  },
};
}

export default function Home({ posts }) {
  return (
    <HomeLayout>
      <Reports/>
      <PostList posts={posts} category='blog' limit={5}/>
    </HomeLayout>
  );
}

function Reports(): ReactElement {
  return (
    <div>
      <div className='w-full h-44'>
        <button onClick={() => router.push(`/reports/wework/paris`)} className='aspect-square rounded-xl overflow-hidden h-full relative'>
          <Image className='opacity-70 hover:opacity-60' src='/images/IMG_6212.jpeg' alt='WeWork' object-fit="contain" fill/>
          <p className='absolute w-full bg-black bg-opacity-10 text-center bottom-0 font-bold text-white text-xl'>WeWork Guide Paris</p>
        </button>
      </div>
    </div>
  );
}