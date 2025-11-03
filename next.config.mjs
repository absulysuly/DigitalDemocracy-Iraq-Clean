/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove output: 'export' for dynamic routes
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

export default nextConfig
