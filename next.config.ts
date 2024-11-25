import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    AI_API_KEY: process.env.AI_API_KEY,
  },
};

module.exports = nextConfig;
