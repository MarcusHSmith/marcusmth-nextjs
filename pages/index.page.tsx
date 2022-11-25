import fs from 'fs';
import matter from 'gray-matter';
import { HomeLayout } from '../components/HomeLayout/HomeLayout';
import { PostList } from '../components/PostList/PostList';

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
      <PostList posts={posts} category='blog' limit={5}/>
    </HomeLayout>
  );
}