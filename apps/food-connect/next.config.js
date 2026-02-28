/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: require("path").join(__dirname, "../../"),
  basePath: process.env.NODE_ENV === 'production' ? '/food' : '',
};
module.exports = nextConfig;
