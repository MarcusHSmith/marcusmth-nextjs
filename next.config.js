/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js', 'api.tsx', '.js'],
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
}

module.exports = nextConfig
