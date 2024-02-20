import Layout from "../components/layout";
import { GoogleAnalytics } from "@next/third-parties/google";
import Head from "next/head";

import "../styles/globals.css";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_MEASUREMENT_ID;

function MyApp({ Component, pageProps }) {
  const { frontmatter } = pageProps;
  const { title, description, featuredImage, tags } = frontmatter || {};

  const titleWithFallback = title || "marcusmth";
  const descriptionWithFallback =
    description || "Marcus's thoughts and tools as a software engineer.";
  const ogImageWithFallback = featuredImage?.src
    ? `https://marcusmth.com/images/${featuredImage.src}`
    : "https://marcusmth.com/images/profile-pic-marcus.jpg";
  const ogKeywordsWithFallback =
    tags || "marcus smith software engineer blog youtube analytics";

  return (
    <>
      <Head>
        <title>{titleWithFallback}</title>
        <meta property="og:title" content={titleWithFallback} />
        <meta property="og:image" content={ogImageWithFallback} />
        <meta property="description" content={descriptionWithFallback} />
        <meta property="og:description" content={descriptionWithFallback} />
        <meta name="keywords" content={ogKeywordsWithFallback}></meta>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
    </>
  );
}

export default MyApp;
