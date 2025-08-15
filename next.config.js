/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features
  experimental: {
    // Enable React 19 experimental features
    ppr: false,
  },

  // Configure TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },

  // Configure ESLint
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Configure static file serving
  assetPrefix: process.env.NODE_ENV === 'production' ? '/next' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/next' : '',

  // Configure output directory to avoid conflicts with Umi
  distDir: '.next',

  // Configure rewrites to coexist with Umi.js
  async rewrites() {
    return [
      {
        source: '/next/:path*',
        destination: '/:path*',
      },
    ];
  },

  // Webpack configuration for compatibility
  webpack: (config, { isServer }) => {
    // Add compatibility for CSS-in-JS libraries
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        module: false,
      };
    }

    return config;
  },

  // Configure headers for better compatibility
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
