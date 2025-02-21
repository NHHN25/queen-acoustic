import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig } from 'payload'
import { Posts } from './collections/Posts'
import { Translations } from './collections/Globals'

export default buildConfig({
    serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
    editor: lexicalEditor(),
    collections: [Posts],
    localization: {
      locales: ['vi', 'en'],
      defaultLocale: 'vi',
      fallback: true,
    },
    globals: [Translations],
    secret: process.env.PAYLOAD_SECRET || '',
    db: mongooseAdapter({
        url: process.env.DATABASE_URI || '',
    }),
    sharp,
})