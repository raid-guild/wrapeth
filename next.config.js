/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['@raidguild/design-system'],
  output: 'export',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
