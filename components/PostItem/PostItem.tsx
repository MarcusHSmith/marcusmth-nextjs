import { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";

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
      className="block mb-6 transition-transform duration-300 hover:scale-102"
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200">
        <div className="p-6 flex flex-col md:flex-row justify-between">
          <div className="flex flex-col justify-center mb-4 md:mb-0 md:mr-6">
            <h2 className="font-bold text-2xl text-blue-600 mb-2">{title}</h2>
            <p className="text-gray-700 mb-2">{description}</p>
            <span className="font-light text-sm text-gray-500">
              {new Date(lastUpdated).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="w-full md:w-60 h-40 relative flex-shrink-0">
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
      </div>
    </Link>
  );
}
