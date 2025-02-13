export default function imageLoader({ src }: { src: string; width?: number; quality?: number }) {
  const basePath = process.env.NODE_ENV === 'production' ? '/queen-acoustic' : '';
  const normalizedSrc = src.startsWith('/') ? src.slice(1) : src;
  const fullPath = `${basePath}/${normalizedSrc}`;
  
  return fullPath;
}
