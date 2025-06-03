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
  return {
    props: {
      posts,
      frontmatter: {
        description:
          "Software engineering insights, YouTube content, and startup journey from Marcus Smith - Engineering Manager, Founder of Series A Solana startup, and Software Engineer",
      },
    },
  };
}

export default function Home({ posts }): ReactElement {
  return (
    <HomeLayout>
      <>
        <PostList posts={posts} category="blog" limit={10} />
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Travel Guides</h2>
          <div className="flex gap-4 justify-center">
            <ReportItem city={CITY.PARIS} />
            <ReportItem city={CITY.BERLIN} />
          </div>
        </div>
      </>
    </HomeLayout>
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
      onClick={() => router.push(`/reports/wework/${city.toLowerCase()}`)}
      className="aspect-square rounded-xl overflow-hidden h-44 w-44 relative group hover:scale-105 transition-transform duration-300"
    >
      <Image
        className="object-cover group-hover:opacity-60 transition-opacity duration-300"
        src={imageSrc}
        alt={`WeWork Guide ${city}`}
        fill
        sizes="176px"
        priority={false}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkrHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyeCMMp4Hbv5/lMa7/aP//Z"
      />
      <p className="absolute w-full bg-black bg-opacity-50 text-center bottom-0 font-bold text-white text-xl p-2 transition-all duration-300 group-hover:bg-opacity-75">
        WeWork Guide {city}
      </p>
    </button>
  );
}
