'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10 bg-black/70 backdrop-blur-sm" />
        <Image
          src="/images/hero-bg.jpg"
          alt="Queen Acoustic Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-6xl font-light text-white mb-4 hero-text">404</h1>
        <h2 className="text-2xl text-white mb-8 hero-subtitle">
          {t('error.pageNotFound')}
        </h2>
        <Link
          href="/"
          className="inline-block px-6 py-3 text-xl bg-gold-400 text-white rounded-sm hover:bg-gold-500 transition-all duration-300 button-shadow gold-glow"
        >
          {t('error.backHome')}
        </Link>
      </div>
    </div>
  );
}
