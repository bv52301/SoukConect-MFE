/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [],
  basePath: process.env.NODE_ENV === 'production' ? '/ui' : '',
};

module.exports = nextConfig;
