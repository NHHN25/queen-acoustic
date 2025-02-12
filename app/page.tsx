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
      <section className="relative min-h-screen smooth-scroll-section flex items-center justify-center section-divide">
        <div className="absolute inset-0 z-0">
          {/* Darker gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
          <div className="absolute inset-0 bg-black/20 z-10" /> {/* Additional dim layer */}
          <Image
            loader={imageLoader}
            src="images/hero-bg.jpg"  // Removed leading slash
            alt="Queen Acoustic Ambiance"
            fill
            className="object-cover brightness-90" // Slightly dimmed image
            priority
          />
        </div>
        <div className="relative z-20 text-center max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl font-light text-white mb-6 tracking-wider hero-text">
              QUEEN<br/>
              <span className="text-gold-300">ACOUSTIC</span>
            </h1>
            <div className="w-24 h-[1px] bg-gold-300 mx-auto mb-6 shadow-lg" />
            <p className="text-white text-xl tracking-wide hero-subtitle mb-8">
              {t('hero.tagline')}
            </p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="px-12 py-4 bg-gold-600/90 backdrop-blur-sm text-white button-shadow gold-glow rounded-sm text-stroke-sm font-medium"
            >
              {t('hero.bookNow')}
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="min-h-screen smooth-scroll-section flex items-center bg-white relative overflow-hidden section-divide">
        <div className="container mx-auto px-4 py-8 md:py-0 max-w-6xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10 mt-16 md:mt-0"
            >
              <div className="space-y-4">
                <h2 className="text-4xl font-light text-gray-900 section-title">
                  {t('about.title')}<br />
                  <span className="text-gold-600">{t('about.subtitle')}</span>
                </h2>
                <div className="w-20 h-[1px] bg-gold-400" />
              </div>
              
              <p className="text-gray-700 leading-relaxed text-lg">
                {t('about.description')}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-gold-700 font-medium text-lg border-l-2 border-gold-400 pl-4">
                    {t('about.musicQuality.title')}
                  </h3>
                  <ul className="space-y-3 pl-4">
                    {t('about.musicQuality.items').map((item: string, index: number) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <span className="w-1 h-1 bg-gold-400 rounded-full mr-3"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-gold-700 font-medium text-lg border-l-2 border-gold-400 pl-4">
                    {t('about.space.title')}
                  </h3>
                  <ul className="space-y-3 pl-4">
                    {t('about.space.items').map((item: string, index: number) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <span className="w-1 h-1 bg-gold-400 rounded-full mr-3"></span>
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
              className="relative h-[600px] group"
            >
              <div className="absolute inset-0 bg-black/5 z-10 group-hover:bg-black/0 transition-colors duration-500" />
              <Image
                loader={imageLoader}
                src="images/about-image.jpg"  // Removed leading slash
                alt="Queen Acoustic Interior"
                fill
                className="object-cover"
              />
              <div className="absolute -inset-2 border border-gold-200 translate-x-4 translate-y-4 z-0" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Performers */}
      <section className="min-h-screen smooth-scroll-section flex items-center bg-gray-900 bg-pattern-dots relative overflow-hidden section-divide">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 to-gray-900/95" />
        <div className="container mx-auto px-4 py-8 md:py-0 max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 mt-16 md:mt-0" // Added margin top for mobile
          >
            <h2 className="text-4xl font-light mb-4 text-white section-title">
              {t('performers.title')}
            </h2>
            <div className="w-20 h-[1px] bg-gradient-to-r from-gold-400/50 to-transparent mx-auto" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                    src={`images/performer-${performer}.jpg`}  // Removed leading slash
                    alt={`Performer ${performer}`}
                    fill
                    className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                  <h3 className="text-white text-2xl font-light mb-2 drop-shadow-lg">
                    {t('performers.performer')} {performer}
                  </h3>
                  <p className="text-gold-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow">
                    {t('performers.schedule')} {performer * 2}, 20:00
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="min-h-screen smooth-scroll-section flex items-center bg-gradient-to-br from-gold-50 via-white to-gold-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-transparent" />
        <div className="container mx-auto px-4 py-8 md:py-0 max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8 mt-16 md:mt-0 backdrop-blur-sm p-8 rounded-sm border border-gold-100/50"
          >
            <h2 className="text-4xl font-light text-gray-900 section-title">
              {t('booking.title')}
            </h2>
            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto" />
            <p className="text-gray-700 max-w-2xl mx-auto font-medium">
              {t('booking.description')}
            </p>
            <button className="mt-8 px-12 py-4 border-2 border-gold-600 bg-gold-600 text-white hover:bg-gold-700 button-shadow gold-glow transition-colors duration-300 text-stroke-sm font-medium">
              {t('booking.button')}
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
