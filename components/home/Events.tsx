'use client';

import { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { format, isToday, addDays, isSameDay } from 'date-fns';
import { vi, enUS } from 'date-fns/locale';
import clsx from 'clsx';
import Image from 'next/image';

// Mock data structure
type Event = {
  id: number;
  date: Date;
  time: string;
  artist: string;
  genre: string;
  status: 'available' | 'limited' | 'full';
};

// Initial mock data - constant data for first render
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

// Mock data generator
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

export default function Events() {
  const { t, language } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  const [eventCache, setEventCache] = useState<Record<string, Event[]>>({
    [new Date().toDateString()]: initialEvents
  });

  // Generate next 7 days for date picker
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
    
    // If we haven't generated events for this date yet, generate and cache them
    if (!eventCache[dateKey]) {
      setEventCache(prev => ({
        ...prev,
        [dateKey]: generateMockEvents(date)
      }));
    }
  };

  // Get current events from cache
  const currentEvents = eventCache[selectedDate.toDateString()] || [];

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

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image with Blur */}
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
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light mb-4 text-gray-900">
            {t('events.title')}
          </h2>
          <p className="text-xl text-gold-600">
            {t('events.subtitle')}
          </p>
        </div>

        {/* Date Picker */}
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

        {/* Events List */}
        <div className="space-y-4">
          {currentEvents.length > 0 ? currentEvents.map((event) => (
            <div
              key={event.id}
              className="bg-gray-50/95 border border-gray-200 rounded-lg p-6 
                       hover:bg-white/95 hover:border-gold-200
                       transition-all duration-300
                       shadow-[0_4px_15px_-3px_rgba(190,141,74,0.1)]
                       hover:shadow-[0_8px_25px_-5px_rgba(190,141,74,0.3)]"
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
  );
}
