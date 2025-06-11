import { ReactElement } from "react";
import Head from "next/head";

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage?: string;
  keywords?: string;
  noIndex?: boolean;
  lastModified?: string;
}

export function SEOHead({
  title,
  description,
  canonicalUrl,
  ogImage = "https://marcusmth.com/images/profile-pic-marcus.jpg",
  keywords = "marcus, smith, software, engineer, blog, youtube, analytics",
  noIndex = false,
  lastModified,
}: SEOHeadProps): ReactElement {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Marcus Smith" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Robots meta tag */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
      )}

      {/* Open Graph tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="marcusmth" />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content="@marcusmth" />

      {/* Article specific tags for blog posts */}
      {lastModified && (
        <>
          <meta property="article:author" content="Marcus Smith" />
          <meta property="article:modified_time" content={lastModified} />
        </>
      )}

      {/* Additional SEO meta tags */}
      <meta name="theme-color" content="#3b82f6" />
      <meta name="msapplication-TileColor" content="#3b82f6" />
      <meta name="apple-mobile-web-app-title" content="marcusmth" />
      <meta name="application-name" content="marcusmth" />
    </Head>
  );
}
