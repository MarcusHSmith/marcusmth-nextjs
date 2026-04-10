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
    <div className="relative mb-6 rounded-lg border border-gray-200 bg-white shadow-md transition-transform duration-300 hover:scale-[1.01] hover:shadow-blue-200">
      <Link
        href={postHref}
        aria-label={`Read ${title}`}
        className="absolute inset-0 rounded-lg"
      />
      <div
        className="pointer-events-none relative z-10"
        style={{ textDecoration: "none" }}
      >
        <div className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="mb-2 text-2xl font-bold text-blue-600 no-underline">
              {title}
            </h2>
            <p className="mb-3 text-gray-700 no-underline">{description}</p>
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-light text-sm text-gray-500">
                {new Date(lastUpdated).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              {!!visibleTags?.length && <TagList tags={visibleTags} />}
            </div>
          </div>
          {featuredImage && (
            <div className="relative h-44 w-full flex-shrink-0 overflow-hidden rounded-md md:h-36 md:w-52">
              {/* Keep post list images fully visible: preserve aspect ratio, shrink to fit, and center instead of cropping. */}
              <Image
                src={`/images/${featuredImage?.src}`}
                alt={featuredImage?.alt}
                layout="fill"
                style={{ objectFit: "contain", objectPosition: "center" }}
                priority
                placeholder="empty"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
