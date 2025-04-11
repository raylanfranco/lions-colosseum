import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* remove once we're ready for launch */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["utfs.io"],
  },
};

export default nextConfig;
