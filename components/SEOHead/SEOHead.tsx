import { ReactElement } from "react";
import Head from "next/head";

interface SEOOverrideProps {
  noIndex?: boolean;
  lastModified?: string;
  articleSpecific?: boolean;
}

// This component is for SEO overrides only - not for replacing the main SEO in _app.page.tsx
// The main SEO handling is already done comprehensively in _app.page.tsx
export function SEOOverride({
  noIndex = false,
  lastModified,
  articleSpecific = false,
}: SEOOverrideProps): ReactElement {
  return (
    <Head>
      {/* Override robots meta tag only if noIndex is needed */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Article specific tags for blog posts */}
      {articleSpecific && lastModified && (
        <>
          <meta property="article:author" content="Marcus Smith" />
          <meta property="article:modified_time" content={lastModified} />
          <meta property="article:section" content="Technology" />
        </>
      )}
    </Head>
  );
}
