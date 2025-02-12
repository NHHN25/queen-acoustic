'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function NotFound() {
  const { language } = useLanguage();

  const content = {
    vi: {
      title: 'Không Tìm Thấy Trang',
      description: 'Trang bạn đang tìm kiếm không tồn tại.'
    },
    en: {
      title: 'Page Not Found',
      description: 'The page you\'re looking for doesn\'t exist.'
    }
  };

  const { title, description } = content[language as keyof typeof content];

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-light text-gray-900">{title}</h2>
        <p className="text-gray-600">{description}</p>
        <div className="pt-6">
          <a href="/" className="text-gold-400 hover:text-gold-500 transition-colors">
            {language === 'vi' ? 'Về Trang Chủ' : 'Back to Home'}
          </a>
        </div>
      </div>
    </div>
  );
}
