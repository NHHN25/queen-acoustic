import { Editor } from '@tiptap/react';
import { TranslationKey } from '@/types/translations';

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

export interface EditorProps {
  editor: Editor | null;
  translations: TranslationKey['admin']['posts'];
}
