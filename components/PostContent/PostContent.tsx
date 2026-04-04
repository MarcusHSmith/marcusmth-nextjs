import { HeaderBio } from "../HeaderBio/HeaderBio";
import { TagList } from "../TagList/TagList";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import { markdownToHtml } from "../../lib/markdown";

const YouTubeEmbed = dynamic(() => import("../YouTubeEmbed/YouTubeEmbed"));

// Add htmlContent as an optional prop
type PostContentProps = {
  frontmatter: any;
  content: string;
  htmlContent?: string;
};

export default function PostContent({
  frontmatter,
  content,
  htmlContent,
}: PostContentProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Helper to handle YouTube embeds in server-rendered HTML
  const renderServerHtml = () => {
    if (!htmlContent) return null;
    // Split on custom YOUTUBE_VIDEO_ID blocks if needed (optional, only if you use this feature)
    const parts = htmlContent.split(/(YOUTUBE_VIDEO_ID=[-\w]+\n[^\n]*)/);
    return parts.map((part, index) => {
      if (part.startsWith("YOUTUBE_VIDEO_ID=")) {
        const videoId = part.split(/=|\n/)[1];
        return <YouTubeEmbed key={index} videoId={videoId} />;
      }
      return <div key={index} dangerouslySetInnerHTML={{ __html: part }} />;
    });
  };

  const renderContent = () => {
    if (!isClient) {
      return null;
    }
    const renderedContent = markdownToHtml(content);
    const parts = renderedContent.split(/(YOUTUBE_VIDEO_ID=[-\w]+\n[^\n]+)/);
    return parts.map((part, index) => {
      if (part.startsWith("YOUTUBE_VIDEO_ID=")) {
        const videoId = part.split(/[\n=]/)[1];
        return <YouTubeEmbed key={index} videoId={videoId} />;
      }
      return <div key={index} dangerouslySetInnerHTML={{ __html: part }} />;
    });
  };

  return (
    <article className="mx-auto w-full max-w-5xl py-4 sm:py-6">
      <Head>
        <link
          rel="license"
          href="https://creativecommons.org/licenses/by/4.0/"
        />
      </Head>
      <div className="mb-6">
        <HeaderBio presentation="min" />
      </div>
      {frontmatter.featuredImage && (
        <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm sm:mb-8">
          <Image
            src={`/images/${frontmatter.featuredImage.src}`}
            alt={frontmatter.featuredImage.alt || frontmatter.title}
            width={1024}
            height={1024}
            className="h-auto max-h-[420px] w-full object-cover object-center"
          />
        </div>
      )}

      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white px-5 py-6 shadow-sm sm:px-8 sm:py-8">
        <div className="mb-6 border-b border-slate-200 pb-6">
          <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
            {frontmatter.title}
          </h1>
          <div className="flex flex-col gap-3 text-base text-slate-600 sm:flex-row sm:flex-wrap sm:items-center">
            <span className="shrink-0">
              {new Date(frontmatter.lastUpdated).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <TagList tags={frontmatter.tags} />
          </div>
        </div>

        <div className="prose prose-lg max-w-none text-slate-800 prose-headings:text-slate-900 prose-p:leading-8 prose-a:text-blue-700 prose-a:decoration-blue-300 prose-a:underline-offset-4">
          {htmlContent ? renderServerHtml() : renderContent()}
        </div>
      </div>
    </article>
  );
}
