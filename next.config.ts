import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@fontsource/inter', '@fontsource/rubik', '@fontsource/outfit'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {

    return [
      {
        source: '/admin/:path*',
        destination: 'https://portal.vecrahost.in',
        permanent: true,
      },
      {
        source: '/dashboard/:path*',
        destination: 'https://portal.vecrahost.in',
        permanent: true,
      },
      {
        source: '/checkout/:path*',
        destination: 'https://portal.vecrahost.in',
        permanent: true,
      },
      {
        source: '/payment/:path*',
        destination: 'https://portal.vecrahost.in',
        permanent: true,
      },
      {
        source: '/login',
        destination: 'https://portal.vecrahost.in',
        permanent: true,
      },
      {
        source: '/client/:path*',
        destination: 'https://portal.vecrahost.in',
        permanent: true,
      },
      {
        source: '/panel/:path*',
        destination: 'https://portal.vecrahost.in',
        permanent: true,
      },
      {
        source: '/custom-plan',
        destination: 'https://portal.vecrahost.in',
        permanent: true,
      },
      {
        source: '/my-transactions',
        destination: 'https://portal.vecrahost.in',
        permanent: true,
      },
      {
        source: '/go',
        destination: '/',
        permanent: true,
      },
      {
        source: '/free-trial',
        destination: '/',
        permanent: true,
      },
    ];
  },
};


export default nextConfig;

