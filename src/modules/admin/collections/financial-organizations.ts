import { CollectionConfig } from 'payload';

import { loggedIn } from './access/loggedIn';
import { publishedOrLoggedIn } from './access/publishedOrLoggedIn';

export const FinancialOrganizations: CollectionConfig = {
  slug: 'financial-organizations',
  access: {
    create: loggedIn,
    delete: loggedIn,
    read: publishedOrLoggedIn,
    update: loggedIn,
  },
  admin: {
    preview: (_, { locale }) => {
      const encodedParams = new URLSearchParams({
        collection: 'financial-organizations',
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
