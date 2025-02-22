import { lexicalHTML } from '@payloadcms/richtext-lexical'
import { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  labels: {
    singular: {en: 'Post', vi: 'Bài viết'},
    plural: {en: 'Posts', vi: 'Bài viết'},
  },
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: {
        en: 'Title',
        vi: 'Tiêu đề',
      }
    },
    lexicalHTML('content', { name: 'htmlcontent' }),
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: {
        en: 'Content',
        vi: 'Nội dung',
      }
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'News', value: 'news' },
        { label: 'Events', value: 'events' },
      ],
      label: {
        en: 'Category',
        vi: 'Danh mục',
      },
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: {
        en: 'Slug',
        vi: 'Đường dẫn',
      },
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      label: {
        en: 'Author',
        vi: 'Tác giả',
      }
    },
    // New cover image field
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: {
        en: 'Cover Image',
        vi: 'Hình ảnh bìa',
      }
    },
  ],
}