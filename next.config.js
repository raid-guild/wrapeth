/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['@raidguild/design-system']);

const nextConfig = {
  exportTrailingSlash: true,
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = withTM(nextConfig);
