import { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: {
        en: 'Media',
        vi: 'Hình ảnh',
    },
    plural: {
        en: 'Media',
        vi: 'Hình ảnh',
    },
  },
  upload: true,
  admin: {
    useAsTitle: 'filename',
    group: { en: 'Post Management', vi: 'Quản Lý Bài Viết' },
  },
  // Additional fields can be added to further customize your media items
  fields: [
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'media-categories',
      hasMany: true,
      label: {
        en: 'Categories',
        vi: 'Danh mục',
      }
    },
  ],
}