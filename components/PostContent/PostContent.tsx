import { HeaderBio } from "../HeaderBio/HeaderBio";
import md from "markdown-it";
import { TagList } from "../TagList/TagList";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const YouTubeEmbed = dynamic(() => import("../YouTubeEmbed/YouTubeEmbed"));

export default function PostPage({ frontmatter, content }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const renderContent = () => {
    if (!isClient) {
      return null;
    }

    const renderedContent = md().render(content);
    const parts = renderedContent.split(/(YOUTUBE_VIDEO_ID=\w+)/);

    return parts.map((part, index) => {
      if (part.startsWith("YOUTUBE_VIDEO_ID=")) {
        const videoId = part.split("=")[1];
        return <YouTubeEmbed key={index} videoId={videoId} />;
      }
      return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />;
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <HeaderBio presentation="min" />
      {frontmatter.featuredImage && (
        <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
          <img
            src={`/images/${frontmatter.featuredImage.src}`}
            alt={frontmatter.title}
            className="w-full h-64 object-cover"
          />
        </div>
      )}

      <div className="prose">
        <h1 className="text-4xl font-bold mb-2">{frontmatter.title}</h1>
        <div className="flex items-center text-gray-600 mb-4">
          <span className="mr-4">
            {new Date(frontmatter.lastUpdated).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <TagList tags={frontmatter.tags} />
        </div>
        <hr className="mb-8" />
        {renderContent()}
      </div>
    </div>
  );
}
