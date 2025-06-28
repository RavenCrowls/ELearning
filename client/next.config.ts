import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "img.freepik.com",
      "res.cloudinary.com",
      "img.clerk.com",
      "images.clerk.dev",
      "images2.thanhnien.vn"
    ],
  },
  devIndicators: false
};

export default nextConfig;
