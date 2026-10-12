/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  serverExternalPackages: ['@react-email/render'],
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
