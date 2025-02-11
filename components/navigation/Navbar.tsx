'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { navigationItems } from '@/constants/navigation';
import NavItem from './NavItem';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-playfair font-bold text-gold-600">
              Queen Acoustic
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navigationItems.map((item) => (
              <NavItem key={item.path} item={item} />
            ))}
            <button className="ml-4 px-6 py-2 bg-gold-600 text-white rounded-md hover:bg-gold-700 transition-colors">
              Đặt Chỗ
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
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
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigationItems.map((item) => (
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
            <button className="w-full mt-4 px-6 py-2 bg-gold-600 text-white rounded-md hover:bg-gold-700 transition-colors">
              Đặt Chỗ
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
