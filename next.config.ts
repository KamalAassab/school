import type { NextConfig } from "next";

// Generated or never-edited files: a new version always lands under a new name,
// so they can be cached forever. Everything else may be replaced in place
// (a new school photo, the real director video) and gets a short TTL instead.
const IMMUTABLE_ASSET_PATHS = ["/news/:path*", "/assets/:path*", "/logo.webp"];
const REPLACEABLE_ASSET_PATHS = ["/images/:path*", "/media/:path*", "/documents/:path*"];

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
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
  async headers() {
    return [
      ...IMMUTABLE_ASSET_PATHS.map((source) => ({
        source,
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      })),
      ...REPLACEABLE_ASSET_PATHS.map((source) => ({
        source,
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      })),
    ];
  },
};

export default nextConfig;
