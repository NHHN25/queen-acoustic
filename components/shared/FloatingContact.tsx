'use client';

import { useState } from 'react';
import { 
  PhoneIcon, 
  ChatBubbleLeftIcon 
} from '@heroicons/react/24/solid';
import { FaFacebook } from 'react-icons/fa';
import { SiZalo } from 'react-icons/si';

export default function FloatingContact() {
  const [isExpanded, setIsExpanded] = useState(false);

  const buttons = [
    {
      id: 'facebook',
      icon: <FaFacebook className="w-6 h-6" />,
      label: 'Facebook',
      href: 'https://www.facebook.com/phongtraqueen.bmt',
      bgColor: 'bg-[#1877F2]',
      hoverBg: 'hover:bg-[#0d6efd]'
    },
    {
      id: 'phone',
      icon: <PhoneIcon className="w-6 h-6" />,
      label: 'Hotline',
      href: 'tel:19005225',
      bgColor: 'bg-green-500',
      hoverBg: 'hover:bg-green-600'
    },
    {
      id: 'zalo',
      icon: <SiZalo className="w-6 h-6" />,
      label: 'Zalo',
      href: 'https://zalo.me/0903150574',
      bgColor: 'bg-[#0068FF]',
      hoverBg: 'hover:bg-[#0054cc]'
    }
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Expandable Buttons */}
      <div className={`flex flex-col gap-2 mb-2 transition-all duration-300 ${
        isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}>
        {buttons.map((button) => (
          <a
            key={button.id}
            href={button.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-4 py-2 text-white rounded-full shadow-lg 
              transition-all duration-300 transform hover:scale-105 ${button.bgColor} ${button.hoverBg}
              md:min-w-[140px]`}
          >
            {button.icon}
            <span className="hidden md:inline">{button.label}</span>
          </a>
        ))}
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`p-4 rounded-full shadow-lg transition-all duration-300 transform
          ${isExpanded ? 'bg-red-500 hover:bg-red-600 rotate-45' : 'bg-gold-400 hover:bg-gold-500'}
          hover:scale-105`}
      >
        <ChatBubbleLeftIcon className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
