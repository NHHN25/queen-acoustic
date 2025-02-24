import { CollectionConfig } from 'payload'

export const MediaCategories: CollectionConfig = {
  slug: 'media-categories',
  labels: {
    singular: { en: 'Media Category', vi: 'Danh mục Media' },
    plural: { en: 'Media Categories', vi: 'Danh mục Media' },
  },
  admin: {
    useAsTitle: 'name',
    group: { en: 'Post Management', vi: 'Quản Lý Bài Viết' },

  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: {
        en: 'Name',
        vi: 'Tên mục',
      }
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: {
        en: 'Slug',
        vi: 'Đường dẫn',
      }
    },
  ],
}