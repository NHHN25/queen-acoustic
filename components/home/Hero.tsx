'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import imageLoader from '@/lib/image-loader';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="smooth-scroll-section section-divide relative flex min-h-screen items-center justify-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/70 to-black/50" />
        <div className="absolute inset-0 z-10 bg-black/20" />
        <Image
          loader={imageLoader}
          src="images/hero-bg.jpg"
          alt="Queen Acoustic Ambiance"
          fill
          className="object-cover brightness-90"
          priority
        />
      </div>
      <div className="relative z-20 max-w-4xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="hero-text mb-6 text-6xl font-light tracking-wider text-white md:text-8xl">
            QUEEN
            <br />
            <span className="text-gold-300">ACOUSTIC</span>
          </h1>
          <div className="mx-auto mb-6 h-[1px] w-24 bg-gold-300 shadow-lg" />
          <p className="hero-subtitle mb-8 text-xl tracking-wide text-white">
            {t('hero.tagline')}
          </p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="button-shadow gold-glow text-stroke-sm rounded-sm bg-gold-400 px-12 py-4 font-medium text-white backdrop-blur-sm hover:bg-gold-500"
          >
            {t('hero.bookNow')}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
