import './globals.css'
import { Playfair_Display, Montserrat } from 'next/font/google'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
})

export const metadata = {
  title: 'Queen Acoustic - Luxury Acoustic Lounge',
  description: 'Experience the finest acoustic music in a luxurious setting',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${montserrat.variable} font-montserrat`}>
        {children}
      </body>
    </html>
  )
}
