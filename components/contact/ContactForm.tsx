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
  
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>();

  const onSubmit = async (formData: ContactFormData) => {
    try {
      // Mock form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', formData);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      console.error('Form submission error:', err);
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
          className={`${inputStyles} ${errors.name ? 'border-red-500' : ''}`}
          placeholder={t('contact.form.namePlaceholder')}
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          {t('contact.form.email')}
        </label>
        <input
          type="email"
          id="email"
          className={`${inputStyles} ${errors.email ? 'border-red-500' : ''}`}
          placeholder={t('contact.form.emailPlaceholder')}
          {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          {t('contact.form.phone')}
        </label>
        <input
          type="tel"
          id="phone"
          className={`${inputStyles} ${errors.phone ? 'border-red-500' : ''}`}
          placeholder={t('contact.form.phonePlaceholder')}
          {...register('phone', { required: 'Phone is required' })}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          {t('contact.form.message')}
        </label>
        <textarea
          id="message"
          rows={4}
          className={`${inputStyles} resize-none ${errors.message ? 'border-red-500' : ''}`}
          placeholder={t('contact.form.messagePlaceholder')}
          {...register('message', { required: 'Message is required' })}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
        )}
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
