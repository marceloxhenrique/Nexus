import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatar.iran.liara.run",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "nexus-images-storage-be46fad2.s3.eu-west-3.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
  devIndicators: false,
};

export default nextConfig;
