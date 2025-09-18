import { CollectionConfig } from 'payload';

import { loggedIn } from './access/loggedIn';
import { publishedOrLoggedIn } from './access/publishedOrLoggedIn';

export const Partners: CollectionConfig = {
  slug: 'partners',
  access: {
    create: loggedIn,
    delete: loggedIn,
    read: publishedOrLoggedIn,
    update: loggedIn,
  },
  admin: {
    preview: (_, { locale }) => {
      const encodedParams = new URLSearchParams({
        collection: 'partners',
        previewSecret: process.env.PREVIEW_SECRET ?? '',
        path: `${process.env.NEXT_PUBLIC_LP_URL}/${locale}`,
      });

      return `${process.env.NEXT_PUBLIC_LP_URL}/preview?${encodedParams.toString()}`;
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      maxLength: 100,
    },
    {
      name: 'category',
      type: 'relationship',
      required: true,
      relationTo: 'categories',
    },
    {
      name: 'link',
      type: 'text',
    },
    {
      name: 'label',
      type: 'text',
      localized: true,
      maxLength: 10,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
  versions: {
    drafts: true,
  },
  orderable: true,
};
