/** @type {import('next').NextConfig} */
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig = {
  output: 'standalone',
  basePath: '',  // Ensure base path is empty
  assetPrefix: '',  // Ensure asset prefix is empty
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: `/${process.env.CLOUDINARY_CLOUD_NAME}/**`,
      }
    ],
    // Default settings for local images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
  },
  experimental: {
    reactCompiler: true,
  },
  serverExternalPackages: ['sharp'],
};

export default withPayload(nextConfig)