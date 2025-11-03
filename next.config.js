/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Skip trailing slash handling
  skipTrailingSlashRedirect: true
}

module.exports = nextConfig
