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
        // One canonical hostname: send www to the apex domain, keeping the path.
        source: '/:path*',
        has: [{ type: 'host', value: 'www.vecrahost.in' }],
        destination: 'https://vecrahost.in/:path*',
        permanent: true,
      },
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
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};


export default nextConfig;

