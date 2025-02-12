/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/queen-acoustic',
  assetPrefix: '/queen-acoustic',
}

module.exports = nextConfig
