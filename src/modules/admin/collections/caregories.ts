import { CollectionConfig } from 'payload';

import { loggedIn } from './access/loggedIn';
import { publishedOrLoggedIn } from './access/publishedOrLoggedIn';

export const Categories: CollectionConfig = {
  slug: 'categories',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      maxLength: 100,
    },
  ],
  admin: {
    useAsTitle: 'name',
    preview: (_, { locale }) => {
      const encodedParams = new URLSearchParams({
        collection: 'categories',
        previewSecret: process.env.PREVIEW_SECRET ?? '',
        path: `${process.env.NEXT_PUBLIC_LP_URL}/${locale}`,
      });

      return `${process.env.NEXT_PUBLIC_LP_URL}/preview?${encodedParams.toString()}`;
    },
  },
  access: {
    create: loggedIn,
    delete: loggedIn,
    read: publishedOrLoggedIn,
    update: loggedIn,
  },
  versions: {
    drafts: true,
  },
};
