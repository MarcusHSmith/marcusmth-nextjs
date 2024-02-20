import { ReactElement, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import router from "next/router";
import Link from "next/link";
import { IPost } from "../PostList/PostList";

interface IProps {
  title: string;
  description: string;
  slug: string;
  rootUrl: string;
  lastUpdated: string;
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
  featuredImage,
}: IProps): ReactElement {
  return (
    <Link
      key={slug}
      href={`${rootUrl}${slug}`}
      style={{ textDecoration: "none" }}
    >
      <div className="border border-gray-200 my-2 rounded-l shadow-lg overflow-hidden flex flex-col">
        <div className="p-4 flex justify-between">
          <div className="flex flex-col justify-center">
            <span className="font-bold text-2xl text-blue-500">{title}</span>
            <span className="text-m text-black">{description}</span>
            <span className="font-light text-xs text-black">
              {new Date(lastUpdated).toDateString()}
            </span>
          </div>
          <div className="h-40 w-60 relative">
            {featuredImage && (
              <Image
                src={`/images/${featuredImage?.src}`}
                alt={featuredImage?.alt}
                className="w-full h-full relative"
                width={240}
                height={160}
              />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
