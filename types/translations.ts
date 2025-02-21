import { translations } from '@/constants/translations';

export type Translations = typeof translations;
export type TranslationKey = typeof translations.en;

declare module '@/types/translations' {
  interface EditorTranslations {
    alignJustify: string;
  }
}
