import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: require("path").join(__dirname, "../../"),
  basePath: '/food',
};

export default nextConfig;
