import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@fontsource/inter', '@fontsource/rubik', '@fontsource/outfit'],
  },
};

export default nextConfig;
