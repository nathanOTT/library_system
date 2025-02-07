import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        // This pattern will enable the loader for images from example.com
        // and any subdomain of it
        protocol: "http",
        hostname: "images.amazon.com",
      },
      {
        // This pattern will enable the loader for images from example.com
        // and any subdomain of it
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        // This pattern will enable the loader for images from example.com
        // and any subdomain of it
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: ""
      }
    ]
  },
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "image",
        }
      }
    }
  }
};

export default nextConfig;
