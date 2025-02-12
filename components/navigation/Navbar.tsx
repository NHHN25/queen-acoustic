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
  const translatedNavItems = navigationItems.map(item => ({
    ...item,
    label: t(`nav.${item.key}`),
    children: item.children?.map(child => ({
      ...child,
      label: t(`nav.${item.key}Submenu.${child.key}`)
    }))
  }));

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="w-32 flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-roboto font-bold text-gold-600">
              Queen
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex-1 md:flex items-center justify-center">
            <div className="flex items-center space-x-6">
              {translatedNavItems.map((item) => (
                <NavItem key={item.path} item={item} />
              ))}
            </div>
          </div>

          {/* Social, Language, and Booking - Desktop */}
          <div className="hidden md:w-40 md:flex items-center justify-end gap-4">
            <SocialLanguageBar />
            <button className="whitespace-nowrap text-sm py-2 px-4 bg-gold-400 text-white rounded-sm hover:bg-gold-500 transition-all duration-300">
              {language === 'vi' ? 'Đặt Chỗ' : 'Book Now'}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
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
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
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
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center justify-center">
                <SocialLanguageBar />
              </div>
            </div>

            {/* Booking Button - Mobile */}
            <button className="w-full mt-4 px-6 py-2 bg-gold-400 text-white rounded-md hover:bg-gold-500 transition-colors text-stroke-sm font-medium">
              {language === 'vi' ? 'Đặt Chỗ' : 'Book Now'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
