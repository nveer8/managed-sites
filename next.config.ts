import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Add customer photo hosts (e.g. Vercel Blob) here when real images arrive.
    remotePatterns: [],
  },
};

export default nextConfig;
