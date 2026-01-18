import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false, // Set to true if you want to ignore TS errors during build
  },
};

export default nextConfig;
