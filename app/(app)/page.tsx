'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { format, isToday, addDays, isSameDay } from 'date-fns';
import { vi, enUS } from 'date-fns/locale';
import clsx from 'clsx';

type Event = {
  id: number;
  date: Date;
  time: string;
  artist: string;
  genre: string;
  status: 'available' | 'limited' | 'full';
};

const initialEvents: Event[] = [
  {
    id: 1,
    date: new Date(),
    time: '20:00',
    artist: 'Artist 1',
    genre: 'Pop Acoustic',
    status: 'available'
  },
  {
    id: 2,
    date: new Date(),
    time: '20:30',
    artist: 'Artist 2',
    genre: 'Rock Acoustic',
    status: 'limited'
  }
];

const generateMockEvents = (date: Date): Event[] => {
  return Array(Math.floor(Math.random() * 3) + 1).fill(null).map((_, i) => ({
    id: Date.now() + i,
    date,
    time: ['19:30', '20:00', '20:30'][i % 3],
    artist: `Artist ${i + 1}`,
    genre: i % 2 === 0 ? 'Pop Acoustic' : 'Rock Acoustic',
    status: ['available', 'limited', 'full'][Math.floor(Math.random() * 3)] as Event['status']
  }));
};

export default function Home() {
  const { t, language } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  const [eventCache, setEventCache] = useState<Record<string, Event[]>>({
    [new Date().toDateString()]: initialEvents
  });

  // Touch handling for mobile
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

  // Events section logic
  const dates = useMemo(() => 
    Array.from({ length: 7 }, (_, i) => addDays(new Date(), i)),
    []
  );

  const formatDate = (date: Date, short: boolean = false) => {
    const locale = language === 'vi' ? vi : enUS;
    const formatStr = short ? 'EEE, dd/MM' : 'EEEE, dd/MM';
    const dateString = format(date, formatStr, { locale });
    return isToday(date) ? `${t('events.today')} - ${dateString}` : dateString;
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    const dateKey = date.toDateString();
    if (!eventCache[dateKey]) {
      setEventCache(prev => ({
        ...prev,
        [dateKey]: generateMockEvents(date)
      }));
    }
  };

  const getStatusStyle = (status: Event['status']) => {
    const baseStyles = "px-3 py-1 text-sm font-medium rounded-full";
    switch (status) {
      case 'available':
        return `${baseStyles} bg-emerald-50 text-emerald-700 border border-emerald-200`;
      case 'limited':
        return `${baseStyles} bg-amber-50 text-amber-700 border border-amber-200`;
      case 'full':
        return `${baseStyles} bg-red-50 text-red-700 border border-red-200`;
    }
  };

  const currentEvents = eventCache[selectedDate.toDateString()] || [];

  return (
    <main className="smooth-scroll-container">
      {/* Hero Section */}
      <section className="smooth-scroll-section section-divide relative flex min-h-screen items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/70 to-black/50" />
          <div className="absolute inset-0 z-10 bg-black/20" />
          <Image
            src="/images/hero-bg.jpg"
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

      {/* Events Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 backdrop-blur-xl z-10" />
          <Image
            src="/images/event-bg.jpg"
            alt="Events Background"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        <div className="container relative z-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light mb-4 text-gray-900">
              {t('events.title')}
            </h2>
            <p className="text-xl text-gold-600">
              {t('events.subtitle')}
            </p>
          </div>

          <div className="flex overflow-x-auto pb-4 mb-8 gap-2 scrollbar-hide">
            {dates.map((date) => (
              <button
                key={date.toISOString()}
                onClick={() => handleDateClick(date)}
                className={clsx(
                  "flex-shrink-0 px-6 py-3 rounded-lg transition-all duration-300",
                  isSameDay(date, selectedDate)
                    ? "bg-gold-400 text-white shadow-lg shadow-gold-400/30 button-shadow"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                )}
              >
                {formatDate(date, true)}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {currentEvents.length > 0 ? currentEvents.map((event) => (
              <div
                key={event.id}
                className="bg-gray-50/95 border border-gray-200 rounded-lg p-6 
                         hover:bg-white/95 hover:border-gold-200
                         transition-all duration-300
                         shadow-[0_4px_15px_-3px_rgba(190,141,74,0.1)]
                         hover:shadow-[5px_5px_15px_5px_rgba(190,141,74,0.8)]"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-gold-600 text-lg font-medium">{event.time}</span>
                      <span className={getStatusStyle(event.status)}>
                        {t(`events.status.${event.status}`)}
                      </span>
                    </div>
                    <h3 className="text-gray-900 text-xl font-medium truncate mb-1">
                      {event.artist}
                    </h3>
                    <p className="text-gray-600">{event.genre}</p>
                  </div>
                  <button className="button-shadow gold-glow px-6 py-2 
                                   bg-gold-400 text-white rounded-lg 
                                   hover:bg-gold-500 transition-all duration-300">
                    {t('events.bookNow')}
                  </button>
                </div>
              </div>
            )) : (
              <div className="text-center text-gray-500 py-12 bg-gray-50/95 rounded-lg border border-gray-200">
                {t('events.noEvents')}
              </div>
            )}
          </div>
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
                src="/images/about-image.jpg"
                alt="Queen Acoustic Interior"
                fill
                className="object-cover"
              />
              <div className="absolute -inset-2 z-0 translate-x-4 translate-y-4 border border-gold-200" />
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
