'use client';

import { LanguageProvider } from '@/contexts/LanguageContext';
import Navbar from '@/components/navigation/Navbar';
import FloatingContact from '@/components/shared/FloatingContact';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
      <LanguageProvider>
        <Navbar />
        {children}
        <FloatingContact />
      </LanguageProvider>
  );
}
