import { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Media',
    plural: 'Media',
  },
  upload: true,
  admin: {
    useAsTitle: 'filename',
  },
  // You can add additional custom fields here if necessary
  fields: [],
}