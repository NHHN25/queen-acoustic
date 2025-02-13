/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/queen-acoustic' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/queen-acoustic' : '',
};

module.exports = nextConfig;
