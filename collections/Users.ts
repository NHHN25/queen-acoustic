import { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: { en: 'User', vi: 'Người dùng' },
    plural: { en: 'Users', vi: 'Người dùng' },
  },
  auth: true, // enable authentication for user login, etc.
  admin: {
    useAsTitle: 'email',
    group: { en: 'Admin', vi: 'Admin'}
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
      label: { en: 'First Name', vi: 'Tên' },
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
      label: { en: 'Last Name', vi: 'Họ' },
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      options: [
        { label: { en: 'Admin', vi: 'Quản Trị Viên'} , value: 'admin' },
        { label: { en: 'Editor', vi: 'Biên Tập Viên'}, value: 'editor' },
      ],
      defaultValue: 'editor',
      label: { en: 'Role', vi: 'Vai trò' },
      admin: {
        position: 'sidebar',
      },
    },
  ],
  access: {
    // Admins see all records; editors only see their own (self)
    read: ({ req: { user } }) => {
      return user?.role === 'admin' ? true : { id: { equals: user?.id } };
    },
    // Only admins can create new users.
    create: ({ req: { user } }) => {
      return user?.role === 'admin';
    },
    // Admins can update any record; editors only update their own.
    update: ({ req: { user } }) => {
      return user?.role === 'admin' ? true : { id: { equals: user?.id } };
    },
    // Only admins can delete users.
    delete: ({ req: { user } }) => {
      return user?.role === 'admin';
    },
  },
};