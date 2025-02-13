'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthInput from '@/components/auth/AuthInput';


type RegisterForm = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [error, setError] = useState('');
  
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>();

  const onSubmit = async (data: RegisterForm) => {
    // Mock registration
    if (data.email !== 'test@example.com') {
      // Simulate successful registration
      router.push('/auth/login');
    } else {
      setError(t('auth.registerError'));
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-light text-center text-gray-900">
          {t('auth.registerTitle')}
        </h2>
        <p className="mt-2 text-sm text-center text-gray-600">
          {t('auth.registerSubtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <AuthInput<RegisterForm>
          id="name"
          type="text"
          label={t('auth.nameLabel')}
          placeholder={t('auth.namePlaceholder')}
          register={register}
          error={errors.name?.message}
        />

        <AuthInput
          id="email"
          type="email"
          label={t('auth.emailLabel')}
          placeholder={t('auth.emailPlaceholder')}
          register={register}
          error={errors.email?.message}
        />

        <AuthInput
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
          {t('auth.registerButton')}
        </button>
      </form>

      <div className="text-sm text-center">
        <span className="text-gray-500">{t('auth.haveAccount')}</span>
        <Link
          href="/auth/login"
          className="font-medium text-gold-400 hover:text-gold-500"
        >
          {t('auth.loginLink')}
        </Link>
      </div>
    </div>
  );
}
