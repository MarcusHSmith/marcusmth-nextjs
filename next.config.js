const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  pageExtensions: [
    "page.tsx",
    "page.ts",
    "page.jsx",
    "page.js",
    "api.tsx",
    ".js",
    "ts",
  ],
  experimental: {
    optimizePackageImports: ["mapbox-gl"],
    scrollRestoration: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { fs: false };

    // Optimize for performance
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@mapbox/node-pre-gyp": false,
      };
    }

    return config;
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
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
  },
  async redirects() {
    return [
      // Redirect www to non-www
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.marcusmth.com",
          },
        ],
        permanent: true,
        destination: "https://marcusmth.com/:path*",
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
        destination: "https://marcusmth.com/:path*",
      },
      // Remove index.html from URLs
      {
        source: "/:path*/index.html",
        permanent: true,
        destination: "/:path*/",
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
