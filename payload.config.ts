import sharp from 'sharp'
import { FixedToolbarFeature, HTMLConverterFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig } from 'payload'
import { Posts } from './collections/Posts'
import { en } from '@payloadcms/translations/languages/en'
import { vi } from '@payloadcms/translations/languages/vi'
import { Media } from './collections/Media'
import { MediaCategories } from './collections/MediaCategories'
import { Users } from './collections/Users'
import { fileURLToPath } from 'url'
import path from 'path'


const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
    editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
            ...defaultFeatures,
            FixedToolbarFeature(),
            HTMLConverterFeature(),
        ]
    }),
    collections: [Posts, Media, MediaCategories, Users],
    i18n: {
        fallbackLanguage: 'vi',
        supportedLanguages: { en, vi },
    },
    secret: process.env.PAYLOAD_SECRET || '',
    db: mongooseAdapter({
        url: process.env.DATABASE_URI || '',
    }),
    sharp,
    admin: {
        importMap: {
            baseDir: path.resolve(dirname),
        },
        meta: {
            title: 'Admin',
            description: 'Bảng điều khiển của phòng trà Queen',
            titleSuffix: ' - Queen Acoustic',
            icons: [
                {
                    type: 'image/png',
                    rel: 'icon',
                    url: '/favicon/favicon.svg',
                },
            ]
        },
        components: {
            graphics: {
                Logo: '/components/ui/Logo.tsx#Logo',
                Icon: '/components/ui/Icon.tsx#Icon',
            }
        },
    }
}
)