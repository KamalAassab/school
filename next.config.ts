import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.cdninstagram.com" },
      { protocol: "https", hostname: "**.fbcdn.net" },
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
