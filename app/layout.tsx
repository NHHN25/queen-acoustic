import Navbar from '@/components/navigation/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${montserrat.variable} font-montserrat`}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
