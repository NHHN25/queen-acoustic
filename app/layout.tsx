import './globals.css';
import { Roboto_Condensed } from 'next/font/google';
import Navbar from '@/components/navigation/Navbar';
import { LanguageProvider } from '@/contexts/LanguageContext';
import FloatingContact from '@/components/shared/FloatingContact';

const robotoCondensed = Roboto_Condensed({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '700'],
  variable: '--font-roboto-condensed',
  preload: false,
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'Queen Acoustic',
    template: '%s | Queen Acoustic',
  },
  description:
    "Experience the finest acoustic music in an elegant setting with Vietnam's top performers",
  icons: {
    icon: [
      {
        url: '/favicon/favicon.ico',
        sizes: 'any',
      },
      {
        url: '/favicon/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: [
      {
        url: '/favicon/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon.ico"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body className={robotoCondensed.className}>
        <LanguageProvider>
          <Navbar />
          {children}
          <FloatingContact />
        </LanguageProvider>
      </body>
    </html>
  );
}
