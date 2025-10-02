import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["aldoratravel.com"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "aldoratravel.com",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
