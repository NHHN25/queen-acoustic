'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  ClockIcon, 
  MapPinIcon 
} from '@heroicons/react/24/outline';
import ContactForm from '@/components/contact/ContactForm';
import Image from 'next/image';

export default function ContactPage() {
  const { t } = useLanguage();
  
  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-black/60">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
          <div className="absolute inset-0 bg-black/20" />
          <Image
            src="/images/hero-bg.jpg"
            alt="Contact Background"
            fill
            className="object-cover object-center brightness-50"
            priority
            unoptimized
          />
        </div>
        <div className="relative z-10 h-full container flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-4xl md:text-5xl font-light mb-4 hero-text">
            {t('contact.title')}
          </h1>
          <p className="text-xl md:text-2xl font-light hero-subtitle">
            {t('contact.subtitle')}
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-light mb-8 text-gold-500">{t('contact.info.title')}</h2>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <MapPinIcon className="w-6 h-6 text-gold-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-gray-400 text-lg mb-1">{t('contact.info.address')}</p>
                    <p className="text-gray-400 font-light">{t('contact.info.addressValue')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <PhoneIcon className="w-6 h-6 text-gold-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-gray-400 text-lg mb-1">{t('contact.info.phone')}</p>
                    <p className="text-gray-400 font-light">{t('contact.info.phoneValue')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <EnvelopeIcon className="w-6 h-6 text-gold-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-gray-400 text-lg mb-1">{t('contact.info.email')}</p>
                    <p className="text-gray-400 font-light">{t('contact.info.emailValue')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <ClockIcon className="w-6 h-6 text-gold-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-gray-400 text-lg mb-1">{t('contact.info.hours')}</p>
                    <p className="text-gray-400 font-light">{t('contact.info.hoursValue')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d486.5561159900795!2d108.0481518730215!3d12.684095575398354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3171f7d5f68ff8ed%3A0x7823582848d57914!2sKaraoke%20Queen!5e0!3m2!1svi!2sus!4v1739418820210!5m2!1svi!2sus"          
                height="450"
                width="600"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-light mb-4 text-gray-900">{t('contact.title')}</h2>
            <p className="text-gray-600 mb-8 font-medium">{t('contact.description')}</p>
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
