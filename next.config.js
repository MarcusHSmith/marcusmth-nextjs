const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js', 'api.tsx', '.js', 'ts'],
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
      {
        source: '/default_sitemap.xml',
        destination: '/api/default_sitemap',
      },
      {
        source: '/posts_sitemap.xml',
        destination: '/api/posts_sitemap',
      },
      {
        source: '/cheatsheets_sitemap.xml',
        destination: '/api/cheatsheets_sitemap',
      },
      {
        source: '/reports_wework_paris_sitemap.xml',
        destination: '/api/reports_wework_paris_sitemap',
      },
      {
        source: '/reports_wework_berlin_sitemap.xml',
        destination: '/api/reports_wework_berlin_sitemap',
      },
    ]
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  }
}

module.exports = withBundleAnalyzer(nextConfig)
