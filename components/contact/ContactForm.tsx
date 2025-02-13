'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLanguage } from '@/contexts/LanguageContext';

const inputStyles = `
  w-full px-4 py-3 rounded-md border-gray-200 bg-gray-50/50
  placeholder:text-gray-400 text-gray-900
  focus:ring-2 focus:ring-gold-500/20 focus:border-gold-400
  transition-all duration-200
`;

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export default function ContactForm() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Mock form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      reset();
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          {t('contact.form.name')}
        </label>
        <input
          type="text"
          id="name"
          className={inputStyles}
          placeholder={t('contact.form.namePlaceholder')}
          {...register('name', { required: true })}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          {t('contact.form.email')}
        </label>
        <input
          type="email"
          id="email"
          className={inputStyles}
          placeholder={t('contact.form.emailPlaceholder')}
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          {t('contact.form.phone')}
        </label>
        <input
          type="tel"
          id="phone"
          className={inputStyles}
          placeholder={t('contact.form.phonePlaceholder')}
          {...register('phone', { required: true })}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          {t('contact.form.message')}
        </label>
        <textarea
          id="message"
          rows={4}
          className={`${inputStyles} resize-none`}
          placeholder={t('contact.form.messagePlaceholder')}
          {...register('message', { required: true })}
        />
      </div>

      {status === 'success' && (
        <div className="text-green-600">{t('contact.form.success')}</div>
      )}

      {status === 'error' && (
        <div className="text-red-600">{t('contact.form.error')}</div>
      )}

      <button
        type="submit"
        className="w-full px-6 py-3 text-l font-medium text-white bg-gold-400 
                 rounded-md hover:bg-gold-500 focus:outline-none focus:ring-2 
                 focus:ring-offset-2 focus:ring-gold-500 transition-all duration-300
                 shadow-lg hover:shadow-gold-400/30 button-shadow"
      >
        {t('contact.form.submit')}
      </button>
    </form>
  );
}
