import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/activites",
        destination: "/vie-scolaire#activites",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
