'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { navigationItems } from '@/constants/navigation';
import NavItem from './NavItem';
import SocialLanguageBar from './SocialLanguageBar';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, language } = useLanguage();

  // Transform navigation items with translations
  const translatedNavItems = navigationItems.map((item) => ({
    ...item,
    label: t(`nav.${item.key}`),
    children: item.children?.map((child) => ({
      ...child,
      label: t(`nav.${item.key}Submenu.${child.key}`),
    })),
  }));

  return (
    <nav className="fixed z-50 w-full bg-white/90 shadow-md backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Desktop Layout */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex w-32 flex-shrink-0 items-center">
            <Link href="/" className="font-roboto text-xl font-bold text-gold-600">
              Queen
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center justify-center md:flex md:flex-1">
            <div className="flex items-center space-x-6">
              {translatedNavItems.map((item) => (
                <NavItem key={item.path} item={item} />
              ))}
            </div>
          </div>

          {/* Social, Language, and Auth - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <SocialLanguageBar />
            <Link
              href="/auth/login"
              className="text-m px-4 py-2 text-gray-700 hover:text-gold-600 transition-colors"
            >
              {t('auth.loginButton')}
            </Link>
            <Link
              href="/auth/register"
              className="text-m px-4 py-2 bg-gold-400 text-white rounded-sm hover:bg-gold-500 transition-colors button-shadow"
            >
              {t('auth.registerButton')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-800"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="border-t border-gray-100 bg-white md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {/* Navigation Items */}
            {translatedNavItems.map((item) => (
              <div key={item.path} className="block">
                <Link
                  href={item.path}
                  className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-gold-600"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pl-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        href={child.path}
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-gold-600"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Social and Language - Mobile */}
            <div className="border-t border-gray-200 pb-3 pt-4">
              <div className="flex items-center justify-center">
                <SocialLanguageBar />
              </div>
            </div>

            {/* Action Buttons - Mobile */}
            <div className="px-4 py-3 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-2">
                <Link
                  href="/auth/login"
                  className="text-center text-sm py-2 text-gray-700 hover:text-gold-600 bg-gray-50 rounded-sm transition-colors"
                >
                  {t('auth.loginButton')}
                </Link>
                <Link
                  href="/auth/register"
                  className="text-center text-sm py-2 bg-gold-400 text-white rounded-sm hover:bg-gold-500 transition-colors"
                >
                  {t('auth.registerButton')}
                </Link>
                <button className="text-center text-sm py-2 bg-gold-500 text-white rounded-sm hover:bg-gold-600 transition-colors">
                  {language === 'vi' ? 'Đặt Chỗ' : 'Book Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
