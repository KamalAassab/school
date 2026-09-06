import type { NextConfig } from "next";

// Generated or never-edited files: a new version always lands under a new name,
// so they can be cached forever. Everything else may be replaced in place
// (a new school photo, the real director video) and gets a short TTL instead.
const IMMUTABLE_ASSET_PATHS = ["/news/:path*", "/assets/:path*", "/logo.webp"];
const REPLACEABLE_ASSET_PATHS = ["/images/:path*", "/media/:path*", "/documents/:path*"];

// Applied to every response. The CSP is deliberately scoped to what the site
// actually loads: everything is same-origin (fonts are self-hosted by
// next/font, images and the video ship from /public) except the Google Maps
// iframe in the footer. 'unsafe-inline' stays on scripts and styles because
// Next injects inline hydration scripts and inline style tags that a static
// export cannot nonce.
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "media-src 'self'",
  "connect-src 'self'",
  // Google serves map embeds from www.google.com but redirects visitors to a
  // local ccTLD in some countries (google.co.ma for Morocco, the school's
  // audience), so both have to be allowed or the map silently goes blank.
  "frame-src https://*.google.com https://*.google.co.ma",
  "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS = [
  // Pin the browser to HTTPS for two years, so a plain-http:// link can never
  // downgrade the connection after the first visit.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "Content-Security-Policy", value: CONTENT_SECURITY_POLICY },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

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
      { source: "/:path*", headers: SECURITY_HEADERS },
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
