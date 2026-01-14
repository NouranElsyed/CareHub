import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Cloudinary
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },

      // Avatar placeholder service
      {
        protocol: "https",
        hostname: "avatar.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
