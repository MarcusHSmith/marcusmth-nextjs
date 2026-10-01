import { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import { TagList } from "../TagList/TagList";

/*
 * `sizes` has to describe the rendered box, or Next falls back to 100vw and
 * serves a ~1920px-wide file into a 208px slot. The box is `w-full md:w-52`,
 * so above the md breakpoint it is a flat 208px; below it, the width is the
 * viewport minus both the container's horizontal padding and the card's own
 * `p-6` (48px). The former varies by container, hence two constants.
 *
 * Keep the `calc(...)` wrapper even where the subtraction is 0. Next scans
 * `sizes` for a bare `vw` token (`getWidths`, next/dist/shared/lib/
 * get-img-props.js) and, on a match, drops every srcset candidate below
 * 640w -- which costs ~278 KiB on the homepage. The `100vw` inside `calc(`
 * does not match that regex, so the full ladder survives.
 */

/** PageShell: `px-4 sm:px-6 lg:px-0` + card `p-6`. */
const SIZES_IN_PAGE_SHELL =
  "(min-width: 768px) 208px, (min-width: 640px) calc(100vw - 96px), calc(100vw - 80px)";

/** Containers with no horizontal padding of their own; card `p-6` only. */
export const SIZES_UNPADDED_CONTAINER =
  "(min-width: 768px) 208px, calc(100vw - 48px)";

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
  /** Eagerly load (and preload) this image. Set it on the LCP card only. */
  priority?: boolean;
  /**
   * Override when the card sits in a container with different horizontal
   * padding than PageShell. Must describe the rendered box -- see the
   * constants above.
   */
  sizes?: string;
}

export function PostItem({
  title,
  description,
  slug,
  rootUrl,
  lastUpdated,
  tags,
  featuredImage,
  priority = false,
  sizes = SIZES_IN_PAGE_SHELL,
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
                fill
                sizes={sizes}
                style={{ objectFit: "contain", objectPosition: "center" }}
                priority={priority}
                placeholder="empty"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
