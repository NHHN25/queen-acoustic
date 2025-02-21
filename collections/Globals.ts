import { GlobalConfig } from 'payload'

export const Translations: GlobalConfig = {
  slug: 'translations',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navigation',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'home',
          type: 'text',
        },
        {
          name: 'about',
          type: 'text',
        },
        {
          name: 'events',
          type: 'text',
        },
        {
          name: 'contact',
          type: 'text',
        },
      ],
    },
    {
      name: 'common',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'readMore',
          type: 'text',
        },
        {
          name: 'loading',
          type: 'text',
        },
      ],
    },
  ],
}