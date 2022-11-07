import fs from 'fs';
import matter from 'gray-matter';
import PostContent from '../../components/PostContent/PostContent';

export async function getStaticPaths() {
  const files = fs.readdirSync('content/blog');
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace('.md', ''),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const fileName = fs.readFileSync(`content/blog/${slug}.md`, 'utf-8');
  const { data: frontmatter, content } = matter(fileName);
  return {
    props: {
      frontmatter,
      content,
    },
  };
}

export default function PostPage({ frontmatter, content }) {
  return (
    <PostContent frontmatter={frontmatter} content={content}/>
  );
}