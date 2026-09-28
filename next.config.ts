import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          { key: "Service-Worker-Allowed", value: "/" },
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/gallery", destination: "/", permanent: true },
      // If the bare domain is ever served by this app, send it permanently to www with the
      // path and query intact. (Today Vercel's domain settings redirect apex → www with a
      // temporary 307; switching that to 308 is a dashboard change for the owner.)
      {
        source: "/:path*",
        has: [{ type: "host", value: "urmithreadingsalon.com" }],
        destination: "https://www.urmithreadingsalon.com/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
