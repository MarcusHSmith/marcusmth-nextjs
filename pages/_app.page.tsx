import Layout from "../components/layout";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
import Script from "next/script";

import "../styles/globals.css";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_MEASUREMENT_ID;

function MyApp({ Component, pageProps }) {
  const { frontmatter } = pageProps;
  const { title, description, featuredImage, tags } = frontmatter || {};

  const titleWithFallback = title ? `${title} | marcusmth` : "marcusmth";
  const descriptionWithFallback =
    description || "Marcus's thoughts and tools as a software engineer";
  const ogImageWithFallback = featuredImage?.src
    ? `https://marcusmth.com/images/${featuredImage.src}`
    : "https://marcusmth.com/images/profile-pic-marcus.jpg";
  const ogKeywordsWithFallback =
    tags?.join(", ") ||
    "marcus, smith, software, engineer, blog, youtube, analytics";
  const canonicalUrl = `https://marcusmth.com${pageProps.path || ""}`;

  return (
    <>
      <Head>
        <title>{titleWithFallback}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Resource hints for performance */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://vitals.vercel-analytics.com" />
        <link rel="dns-prefetch" href="https://img.youtube.com" />
        <link rel="dns-prefetch" href="https://api.mapbox.com" />

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

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={titleWithFallback} />
        <meta
          property="twitter:description"
          content={descriptionWithFallback}
        />
        <meta property="twitter:image" content={ogImageWithFallback} />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      {GA_MEASUREMENT_ID && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}
      <Analytics />
    </>
  );
}

export default MyApp;
