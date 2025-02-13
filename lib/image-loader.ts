export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  const baseUrl = process.env.NODE_ENV === 'production' ? '/queen-acoustic' : '';
  return `${baseUrl}/${src}${width ? `?w=${width}` : ''}${quality ? `&q=${quality}` : ''}`;
}
