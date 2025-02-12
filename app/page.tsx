'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import imageLoader from '@/lib/image-loader';

export default function Home() {
  const { t } = useLanguage();

  // Add touch handling for mobile
  useEffect(() => {
    let touchStart = 0;
    let touchEnd = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStart = e.changedTouches[0].screenY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEnd = e.changedTouches[0].screenY;
      handleSwipe();
    };

    const handleSwipe = () => {
      const swipeLength = touchStart - touchEnd;
      if (Math.abs(swipeLength) > 50) {
        // Add smooth class temporarily for touch-based scrolling
        document.documentElement.style.scrollBehavior = 'smooth';
        setTimeout(() => {
          document.documentElement.style.scrollBehavior = 'auto';
        }, 1000);
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <main className="smooth-scroll-container">
      {/* Hero Section */}
      <section className="smooth-scroll-section section-divide relative flex min-h-screen items-center justify-center">
        <div className="absolute inset-0 z-0">
          {/* Darker gradient overlay */}
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/70 to-black/50" />
          <div className="absolute inset-0 z-10 bg-black/20" /> {/* Additional dim layer */}
          <Image
            loader={imageLoader}
            src="images/hero-bg.jpg" // Removed leading slash
            alt="Queen Acoustic Ambiance"
            fill
            className="object-cover brightness-90" // Slightly dimmed image
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

      {/* About Section */}
      <section className="smooth-scroll-section section-divide relative flex min-h-screen items-center overflow-hidden bg-white">
        <div className="container relative z-10 mx-auto max-w-6xl px-4 py-8 md:py-0">
          <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mt-16 space-y-10 md:mt-0"
            >
              <div className="space-y-4">
                <h2 className="section-title text-4xl font-light text-gray-900">
                  {t('about.title')}
                  <br />
                  <span className="text-gold-600">{t('about.subtitle')}</span>
                </h2>
                <div className="h-[1px] w-20 bg-gold-400" />
              </div>

              <p className="text-lg leading-relaxed text-gray-700">{t('about.description')}</p>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="border-l-2 border-gold-400 pl-4 text-lg font-medium text-gold-700">
                    {t('about.musicQuality.title')}
                  </h3>
                  <ul className="space-y-3 pl-4">
                    {t('about.musicQuality.items').map((item: string, index: number) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <span className="mr-3 h-1 w-1 rounded-full bg-gold-400"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="border-l-2 border-gold-400 pl-4 text-lg font-medium text-gold-700">
                    {t('about.space.title')}
                  </h3>
                  <ul className="space-y-3 pl-4">
                    {t('about.space.items').map((item: string, index: number) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <span className="mr-3 h-1 w-1 rounded-full bg-gold-400"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative h-[600px]"
            >
              <div className="absolute inset-0 z-10 bg-black/5 transition-colors duration-500 group-hover:bg-black/0" />
              <Image
                loader={imageLoader}
                src="images/about-image.jpg" // Removed leading slash
                alt="Queen Acoustic Interior"
                fill
                className="object-cover"
              />
              <div className="absolute -inset-2 z-0 translate-x-4 translate-y-4 border border-gold-200" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Performers */}
      <section className="smooth-scroll-section bg-pattern-dots section-divide relative flex min-h-screen items-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 to-gray-900/95" />
        <div className="container relative z-10 mx-auto max-w-6xl px-4 py-8 md:py-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 mt-16 text-center md:mt-0" // Added margin top for mobile
          >
            <h2 className="section-title mb-4 text-4xl font-light text-white">
              {t('performers.title')}
            </h2>
            <div className="mx-auto h-[1px] w-20 bg-gradient-to-r from-gold-400/50 to-transparent" />
          </motion.div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[1, 2, 3].map((performer) => (
              <motion.div
                key={performer}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden"
              >
                <div className="relative h-[500px]">
                  <Image
                    loader={imageLoader}
                    src={`images/performer-${performer}.jpg`} // Removed leading slash
                    alt={`Performer ${performer}`}
                    fill
                    className="object-cover grayscale filter transition-all duration-500 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 translate-y-6 transform bg-gradient-to-t from-black/90 via-black/60 to-transparent p-8 transition-transform duration-300 group-hover:translate-y-0">
                  <h3 className="mb-2 text-2xl font-light text-white drop-shadow-lg">
                    {t('performers.performer')} {performer}
                  </h3>
                  <p className="text-gold-300 opacity-0 drop-shadow transition-opacity duration-300 group-hover:opacity-100">
                    {t('performers.schedule')} {performer * 2}, 20:00
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
