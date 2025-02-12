import type { ImageLoader } from 'next/image';

const imageLoader: ImageLoader = ({ src }) => {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://nhhn25.github.io/queen-acoustic'
    : '';
  return `${baseUrl}${src}`;
};

export default imageLoader;
