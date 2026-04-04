import { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import { TagList } from "../TagList/TagList";

interface IProps {
  title: string;
  description: string;
  slug: string;
  rootUrl: string;
  lastUpdated: string;
  tags?: string[];
  featuredImage: {
    src: string;
    alt: string;
  };
}

export function PostItem({
  title,
  description,
  slug,
  rootUrl,
  lastUpdated,
  tags,
  featuredImage,
}: IProps): ReactElement {
  const visibleTags = tags?.slice(0, 3);
  const postHref = `${rootUrl}${slug}`;

  return (
    <div className="relative mb-6 rounded-lg border border-gray-200 bg-white shadow-md transition-transform duration-300 hover:scale-102 hover:shadow-blue-200">
      <Link
        key={slug}
        href={postHref}
        aria-label={`Open post: ${title}`}
        className="absolute inset-0 rounded-lg"
      />
      <div className="pointer-events-none p-6 flex flex-col justify-between md:flex-row">
        <div className="mb-4 flex flex-col justify-center md:mb-0 md:mr-6">
          <h2 className="mb-2 text-2xl font-bold text-blue-600">{title}</h2>
          <p className="mb-2 text-gray-700">{description}</p>
          <span className="text-sm font-light text-gray-500">
            {new Date(lastUpdated).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        <div className="relative h-40 w-full flex-shrink-0 md:w-60">
          {featuredImage && (
            <Image
              src={`/images/${featuredImage?.src}`}
              alt={featuredImage?.alt}
              className="rounded-md object-contain"
              layout="fill"
              priority
              placeholder="empty"
            />
          )}
        </div>
      </div>
      {!!visibleTags?.length && (
        <div className="pointer-events-none px-6 pb-6">
          <div className="pointer-events-auto">
            <TagList tags={visibleTags} />
          </div>
        </div>
      )}
    </div>
  );
}
