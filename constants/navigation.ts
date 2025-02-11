import { NavItem } from '@/types/navigation';

export const navigationItems: NavItem[] = [
  {
    label: 'Trang Chủ',
    path: '/',
  },
  {
    label: 'Giới Thiệu',
    path: '/gioi-thieu',
    children: [
      { label: 'Ca Sĩ', path: '/gioi-thieu/ca-si' },
      { label: 'Ban Nhạc', path: '/gioi-thieu/ban-nhac' },
      { label: 'Biên Tập Chương Trình', path: '/gioi-thieu/bien-tap-chuong-trinh' },
      { label: 'Queen Acoustic', path: '/gioi-thieu/queen-acoustic' },
      { label: 'Hệ Thống Queen', path: '/gioi-thieu/he-thong-queen' },
    ],
  },
  {
    label: 'Lịch Diễn',
    path: '/lich-dien',
    children: [
      { label: 'Lịch Theo Ca Sĩ', path: '/lich-dien/theo-ca-si' },
      { label: 'Lịch Theo Tuần/Tháng', path: '/lich-dien/theo-thoi-gian' },
    ],
  },
  {
    label: 'Tin Tức',
    path: '/tin-tuc',
    children: [
      { label: 'Khám Phá', path: '/tin-tuc/kham-pha' },
      { label: 'Tuyển Dụng', path: '/tin-tuc/tuyen-dung' },
    ],
  },
  {
    label: 'Liên Hệ',
    path: '/lien-he',
  },
];
