import type { ImageLoader } from 'next/image';

const imageLoader: ImageLoader = ({ src }) => {
  // Remove the leading slash for GitHub Pages compatibility
  const imageSrc = src.startsWith('/') ? src.slice(1) : src;
  return process.env.NODE_ENV === 'production' ? `/queen-acoustic/${imageSrc}` : `/${imageSrc}`;
};

export default imageLoader;
