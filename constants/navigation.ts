import { NavItem } from '@/types/navigation';

export const navigationItems: NavItem[] = [
  {
    key: 'home',
    path: '/',
    label: 'Home',
  },
  {
    key: 'about',
    path: '/about',
    label: 'About',
    children: [
      {
        key: 'singers',
        path: '/about/singers',
        label: 'Singers',
      },
      {
        key: 'band',
        path: '/about/band',
        label: 'Band',
      },
      {
        key: 'program',
        path: '/about/program',
        label: 'Program',
      },
      {
        key: 'about',
        path: '/about/queen-acoustic',
        label: 'Queen Acoustic',
      },
      {
        key: 'system',
        path: '/about/system',
        label: 'System',
      },
    ],
  },
  {
    key: 'schedule',
    path: '/schedule',
    label: 'Schedule',
    children: [
      {
        key: 'bySinger',
        path: '/schedule/by-singer',
        label: 'By Singer',
      },
      {
        key: 'byTime',
        path: '/schedule/by-time',
        label: 'By Time',
      },
    ],
  },
  {
    key: 'news',
    path: '/news',
    label: 'News',
    children: [
      {
        key: 'discover',
        path: '/news/discover',
        label: 'Discover',
      },
      {
        key: 'careers',
        path: '/news/careers',
        label: 'Careers',
      },
    ],
  },
  {
    key: 'contact',
    path: '/contact',
    label: 'Contact',
  },
];
