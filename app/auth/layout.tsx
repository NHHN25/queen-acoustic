import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/70 to-black/50" />
        <div className="absolute inset-0 z-10 bg-black/20" />
        <Image
          src="/images/hero-bg.jpg"
          alt="Queen Acoustic Background"
          fill
          className="object-cover brightness-75"
          priority
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4 py-12">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
