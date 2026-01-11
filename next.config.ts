import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    minimumCacheTTL: 604800,
    formats: ["image/webp"],
    qualities: [70, 80],
    deviceSizes: [360, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [320, 480, 520, 640, 800, 1200],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "www.edcwebdesign.com",
      },
    ],
  },
};

export default nextConfig;
