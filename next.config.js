const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  pageExtensions: [
    "page.tsx",
    "page.ts",
    "page.jsx",
    "page.js",
    "api.tsx",
    ".js",
    "ts",
  ],
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
      {
        source: "/default_sitemap.xml",
        destination: "/api/default_sitemap",
      },
      {
        source: "/posts_sitemap.xml",
        destination: "/api/posts_sitemap",
      },
      {
        source: "/cheatsheets_sitemap.xml",
        destination: "/api/cheatsheets_sitemap",
      },
      {
        source: "/tags_sitemap.xml",
        destination: "/api/tags_sitemap",
      },
      {
        source: "/reports_wework_paris_sitemap.xml",
        destination: "/api/reports_wework_paris_sitemap",
      },
      {
        source: "/reports_wework_berlin_sitemap.xml",
        destination: "/api/reports_wework_berlin_sitemap",
      },
      {
        source: "/feed.xml/",
        destination: "/api/feed",
      },
    ];
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
    localeDetection: false,
  },
  async redirects() {
    return [
      // Redirect non-www to www
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "marcusmth.com",
          },
        ],
        permanent: true,
        destination: "https://www.marcusmth.com/:path*",
      },
      // Redirect HTTP to HTTPS
      {
        source: "/:path*",
        has: [
          {
            type: "header",
            key: "x-forwarded-proto",
            value: "http",
          },
        ],
        permanent: true,
        destination: "https://www.marcusmth.com/:path*",
      },
      // Remove index.html from URLs (without trailing slash to avoid redirect chain)
      {
        source: "/index.html",
        permanent: true,
        destination: "/",
      },
      {
        source: "/:path+/index.html",
        permanent: true,
        destination: "/:path+",
      },
      // Remove .html extensions
      {
        source: "/:path*.html",
        permanent: true,
        destination: "/:path*",
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
