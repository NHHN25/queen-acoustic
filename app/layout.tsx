import './globals.css'
import { Roboto_Condensed } from 'next/font/google'
import Navbar from '@/components/navigation/Navbar'
import { LanguageProvider } from '@/contexts/LanguageContext'

const robotoCondensed = Roboto_Condensed({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '700'],
  variable: '--font-roboto-condensed',
  preload: false,
  display: 'swap',
})

export const metadata = {
  title: {
    default: 'Queen Acoustic',
    template: '%s | Queen Acoustic'
  },
  description: 'Experience the finest acoustic music in an elegant setting with Vietnam\'s top performers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={robotoCondensed.className}>
        <LanguageProvider>
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
