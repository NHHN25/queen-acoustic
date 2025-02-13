'use client';

import { useEffect } from 'react';
import Hero from '@/components/home/Hero';
import Events from '@/components/home/Events';
import About from '@/components/home/About';

export default function Home() {
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

  return (
    <main className="smooth-scroll-container">
      <Hero />
      <Events />
      <About />
    </main>
  );
}
