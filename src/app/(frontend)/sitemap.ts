import { MetadataRoute } from 'next';

import { routing } from '@/i18n/routing';
import generateSitemap from '@nexo-next/cdk/utils/generateSitemap';

const host = 'https://foydabroker.uz';

export default function sitemap(): MetadataRoute.Sitemap {
  return generateSitemap({
    languages: routing.locales,
    host,
    routes: ['', 'sellers', 'organisations'].map((path) => ({ path })),
    defaultLang: '',
  });
}
