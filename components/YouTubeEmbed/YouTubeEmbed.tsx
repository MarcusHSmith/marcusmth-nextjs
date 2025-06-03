import React, { useState } from "react";
import Image from "next/image";

interface YouTubeEmbedProps {
  videoId: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoId }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleClick = () => {
    setIsLoaded(true);
  };

  if (isLoaded) {
    return (
      <div className="relative w-full pb-[56.25%] my-8">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
          loading="lazy"
        ></iframe>
      </div>
    );
  }

  return (
    <div
      className="relative w-full pb-[56.25%] my-8 cursor-pointer group"
      onClick={handleClick}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black rounded-lg overflow-hidden">
        <Image
          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
          alt="YouTube video thumbnail"
          fill
          sizes="(max-width: 768px) 100vw, 896px"
          className="object-cover"
          priority={false}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:bg-red-700 transition-colors">
            <svg
              className="w-6 h-6 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
          Click to play
        </div>
      </div>
    </div>
  );
};

export default YouTubeEmbed;
