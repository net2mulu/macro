import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cms.macrogc.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.macrogc.com",
      },
    ],
  },
};

export default nextConfig;
