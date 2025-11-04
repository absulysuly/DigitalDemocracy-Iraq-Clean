/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove output: 'export' for dynamic routes
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
  transpilePackages: ['hijri-date-converter']
}

export default nextConfig
