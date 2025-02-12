/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/queen-acoustic' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/queen-acoustic' : '',
};

module.exports = nextConfig;
