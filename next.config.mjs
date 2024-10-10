/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        fs: false,
      };
    }
    
    // Add this externals configuration
    config.externals = [
      ...config.externals,
      { 'bufferutil': 'bufferutil' },
      { 'utf-8-validate': 'utf-8-validate' },
    ];

    return config;
  },
  // Keep these performance optimizations
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development',
  },
};

export default nextConfig;
