import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel builds Next.js natively — no standalone/self-host output needed.
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
