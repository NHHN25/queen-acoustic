'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthInput from '@/components/auth/AuthInput';
import Image from 'next/image';
import imageLoader from '@/lib/image-loader';

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [error, setError] = useState('');
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    // Mock authentication
    if (data.email === 'test@example.com' && data.password === 'password') {
      router.push('/');
    } else {
      setError(t('auth.loginError'));
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/70 to-black/50" />
        <Image
          loader={imageLoader}
          src="../images/hero-bg.jpg"
          alt="Login Background"
          fill
          className="object-cover brightness-75"
          priority
          unoptimized
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4 py-12">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-8">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-light text-center text-black">
                {t('auth.loginTitle')}
              </h2>
              <p className="mt-2 text-sm text-center text-gray-600">
                {t('auth.loginSubtitle')}
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <AuthInput<LoginForm>
                id="email"
                type="email"
                label={t('auth.emailLabel')}
                placeholder={t('auth.emailPlaceholder')}
                register={register}
                error={errors.email?.message}
              />

              <AuthInput<LoginForm>
                id="password"
                type="password"
                label={t('auth.passwordLabel')}
                placeholder={t('auth.passwordPlaceholder')}
                register={register}
                error={errors.password?.message}
              />

              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}

              <button
                type="submit"
                className="w-full px-4 py-2 text-sm font-medium text-white bg-gold-400 rounded-md hover:bg-gold-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500"
              >
                {t('auth.loginButton')}
              </button>
            </form>

            <div className="text-sm text-center">
              <span className="text-gray-500">{t('auth.noAccount')}</span>
              <Link
                href="/auth/register"
                className="font-medium text-gold-400 hover:text-gold-500"
              >
                {t('auth.registerLink')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
