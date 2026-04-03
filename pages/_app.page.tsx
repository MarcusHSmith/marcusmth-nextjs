import Layout from "../components/layout";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
import { StructuredData } from "../components/StructuredData/StructuredData";
import { useRouter } from "next/router";

import "../styles/globals.css";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_MEASUREMENT_ID;

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { frontmatter } = pageProps;
  const { title, description, featuredImage, tags } = frontmatter || {};

  const titleWithFallback = title ? `${title} | marcusmth` : "marcusmth";
  const descriptionWithFallback =
    description || "Marcus's thoughts and tools as a software engineer";
  const ogImageWithFallback = featuredImage?.src
    ? `https://www.marcusmth.com/images/${featuredImage.src}`
    : "https://www.marcusmth.com/images/profile-pic-marcus.jpg";
  const ogKeywordsWithFallback =
    tags?.join(", ") ||
    "marcus, smith, software, engineer, blog, youtube, analytics";
  const canonicalPath = (pageProps.path || router.asPath || "").split("?")[0];
  const canonicalUrl = `https://www.marcusmth.com${canonicalPath}`;

  return (
    <>
      <Head>
        <title>{titleWithFallback}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <meta
          name="googlebot"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />

        {/* Primary Meta Tags */}
        <meta name="title" content={titleWithFallback} />
        <meta name="description" content={descriptionWithFallback} />
        <meta name="keywords" content={ogKeywordsWithFallback} />
        <meta name="author" content="Marcus Smith" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={titleWithFallback} />
        <meta property="og:description" content={descriptionWithFallback} />
        <meta property="og:image" content={ogImageWithFallback} />
        <meta property="og:site_name" content="marcusmth" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={titleWithFallback} />
        <meta name="twitter:description" content={descriptionWithFallback} />
        <meta name="twitter:image" content={ogImageWithFallback} />
        <meta name="twitter:creator" content="@marcusmth" />
        <meta name="twitter:site" content="@marcusmth" />
      </Head>

      {/* Add structured data for blog posts */}
      {title && tags && (
        <StructuredData
          title={titleWithFallback}
          description={descriptionWithFallback}
          url={canonicalUrl}
          publishedDate={frontmatter?.date || new Date().toISOString()}
          featuredImage={featuredImage}
          tags={tags}
        />
      )}

      {/* Add website structured data for homepage */}
      {!title && <StructuredData type="website" />}

      <Layout>
        <Component {...pageProps} />
      </Layout>
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
      <Analytics />
    </>
  );
}

export default MyApp;
