import { postgresAdapter } from '@payloadcms/db-postgres';
import { s3Storage } from '@payloadcms/storage-s3';
import { buildConfig } from 'payload';

import { migrations } from '@/migrations';

import { Categories } from './collections/caregories';
import { FinancialOrganizations } from './collections/financial-organizations';
import { Media } from './collections/media';
import { Partners } from './collections/partners';

export default buildConfig({
  collections: [Media, Categories, Partners, FinancialOrganizations],

  db: postgresAdapter({
    pool: {
      connectionString: process.env.PG_DATABASE_URL ?? '',
    },
    prodMigrations: migrations,
  }),

  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET ?? '',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY ?? '',
          secretAccessKey: process.env.S3_SECRET_KEY ?? '',
        },
        region: process.env.S3_REGION,
        endpoint: process.env.MINIO_URL,
        forcePathStyle: true,
      },
    }),
  ],

  secret: process.env.PAYLOAD_SECRET ?? '',

  localization: {
    locales: ['ru', 'uz'],
    defaultLocale: 'uz',
  },
  typescript: {
    outputFile: './src/modules/admin/payload.types.ts',
  },

  routes: {
    admin: '/lp-admin',
    api: '/cms-api',
  },
});
