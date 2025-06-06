import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};

export default nextConfig;
