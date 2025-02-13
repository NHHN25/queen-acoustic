'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import imageLoader from '@/lib/image-loader';

export default function About() {
  const { t } = useLanguage();

  return (
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

            <p className="text-lg leading-relaxed text-gray-700">
              {t('about.description')}
            </p>

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
              src="images/about-image.jpg"
              alt="Queen Acoustic Interior"
              fill
              className="object-cover"
            />
            <div className="absolute -inset-2 z-0 translate-x-4 translate-y-4 border border-gold-200" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
