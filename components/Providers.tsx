'use client';

import { SessionProvider } from "next-auth/react";
import { LanguageProvider } from '@/contexts/LanguageContext';
import Navbar from '@/components/navigation/Navbar';
import FloatingContact from '@/components/shared/FloatingContact';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <LanguageProvider>
        <Navbar />
        {children}
        <FloatingContact />
      </LanguageProvider>
    </SessionProvider>
  );
}
