export interface Post {
  id: string;
  title: string;
  content: string;
  category: 'news' | 'events';
  slug: string;
  author?: {
    id: string;
    email: string;
  };
}
