import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // better-sqlite3 is a native Node.js module — exclude from client bundle
  serverExternalPackages: ["better-sqlite3"],

  // 301 redirects: /blog → /tin-tuc (giữ SEO ranking)
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/tin-tuc",
        permanent: true,
      },
      {
        source: "/blog/:path*",
        destination: "/tin-tuc/:path*",
        permanent: true,
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
