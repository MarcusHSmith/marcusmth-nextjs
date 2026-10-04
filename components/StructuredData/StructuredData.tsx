import { ReactElement } from "react";
import Head from "next/head";

interface BlogStructuredDataProps {
  type?: "blog";
  title: string;
  description: string;
  url: string;
  publishedDate: string;
  modifiedDate?: string;
  featuredImage?: {
    src: string;
    alt: string;
  };
  tags: string[];
}

interface WebsiteStructuredDataProps {
  type: "website";
}

type StructuredDataProps = BlogStructuredDataProps | WebsiteStructuredDataProps;

export function StructuredData(props: StructuredDataProps): ReactElement {
  if ("type" in props && props.type === "website") {
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "marcusmth",
      description: "Marcus's thoughts and tools as a software engineer",
      url: "https://www.marcusmth.com",
      author: {
        "@type": "Person",
        name: "Marcus Smith",
        url: "https://www.marcusmth.com",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://www.marcusmth.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    };

    return (
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </Head>
    );
  }

  // TypeScript narrowing - at this point props is BlogStructuredDataProps
  const blogProps = props as BlogStructuredDataProps;

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blogProps.title,
    description: blogProps.description,
    url: blogProps.url,
    datePublished: blogProps.publishedDate,
    dateModified: blogProps.modifiedDate || blogProps.publishedDate,
    author: {
      "@type": "Person",
      name: "Marcus Smith",
      url: "https://www.marcusmth.com",
    },
    publisher: {
      "@type": "Person",
      name: "Marcus Smith",
      url: "https://www.marcusmth.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": blogProps.url,
    },
    keywords: blogProps.tags.join(", "),
    ...(blogProps.featuredImage && {
      image: {
        "@type": "ImageObject",
        url: `https://www.marcusmth.com/images/${blogProps.featuredImage.src}`,
        caption: blogProps.featuredImage.alt,
      },
    }),
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogSchema),
        }}
      />
    </Head>
  );
}
