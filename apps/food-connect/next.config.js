/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: require("path").join(__dirname, "../../"),
  basePath: '/food',
};
module.exports = nextConfig;
