'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { NavItem as NavItemType } from '@/types/navigation';

export default function NavItem({ item }: { item: NavItemType }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href={item.path}
        className="flex items-center px-4 py-2 text-gray-800 transition-colors hover:text-gold-600"
      >
        {item.label}
        {item.children && (
          <ChevronDownIcon
            className={`ml-1 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        )}
      </Link>

      {item.children && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute left-0 z-50 mt-0 w-48 overflow-hidden rounded-md bg-white shadow-lg"
            >
              {item.children.map((child) => (
                <Link
                  key={child.path}
                  href={child.path}
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-gold-50 hover:text-gold-600"
                >
                  {child.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
