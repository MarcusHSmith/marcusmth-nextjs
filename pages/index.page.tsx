import fs from "fs";
import matter from "gray-matter";
import { ReactElement, useMemo } from "react";
import { HomeLayout } from "../components/HomeLayout/HomeLayout";
import { PostList } from "../components/PostList/PostList";
import Image from "next/image";
import router from "next/router";
import { CITY } from "./../lib/interfaces";

export async function getStaticProps() {
  // Get all our posts
  const files = fs.readdirSync("content/blog");
  const posts = files.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const readFile = fs.readFileSync(`content/blog/${fileName}`, "utf-8");
    const { data: frontmatter } = matter(readFile);

    return {
      slug,
      frontmatter,
    };
  });

  // Count published posts
  const publishedPostsCount = posts.filter(
    (post) => post.frontmatter.isPublished
  ).length;

  return {
    props: {
      posts,
      publishedPostsCount,
      frontmatter: {
        description:
          "Software engineering insights, YouTube content, and startup journey from Marcus Smith - Engineering Manager, Founder of Series A Solana startup, and Software Engineer",
      },
    },
  };
}

export default function Home({ posts, publishedPostsCount }) {
  return (
    <HomeLayout>
      <>
        <h1 className="text-4xl font-bold mb-8">
          Software Engineering and Interests from Across the Web{" "}
          <span className="text-lg text-gray-600 font-normal">
            ({publishedPostsCount}{" "}
            {publishedPostsCount === 1 ? "post" : "posts"})
          </span>
        </h1>
        <PostList posts={posts} category="blog" />
        {/* <Reports /> */}
      </>
    </HomeLayout>
  );
}

function Reports(): ReactElement {
  return (
    <div>
      <div className="w-full h-44">
        <div className="w-full h-full space-x-4 flex">
          <ReportItem city={CITY.PARIS} />
          <ReportItem city={CITY.BERLIN} />
        </div>
      </div>
    </div>
  );
}

function ReportItem({ city }: { city: CITY }): ReactElement {
  const imageSrc = useMemo(() => {
    switch (city) {
      case CITY.PARIS:
        return "/images/IMG_6212.jpeg";
      case CITY.BERLIN:
        return "/images/IMG_7360.png";
    }
  }, [city]);
  return (
    <button
      onClick={() => router.push(`/reports/wework/${city.toLocaleLowerCase()}`)}
      className="aspect-square rounded-xl overflow-hidden h-44 w-44 relative"
    >
      <Image
        className="hover:opacity-60"
        src={imageSrc}
        alt="WeWork"
        style={{ objectFit: "contain" }}
        width={176}
        height={176}
      />
      <p className="absolute w-full bg-black bg-opacity-10 text-center bottom-0 font-bold text-white text-xl">
        WeWork Guide {city}
      </p>
    </button>
  );
}
