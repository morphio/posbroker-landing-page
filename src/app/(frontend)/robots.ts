import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/uz',
          '/uz/sellers',
          '/uz/organisations',
          '/ru',
          '/ru/sellers',
          '/ru/organisations',
        ],
        disallow: ['/lp-admin'],
      },
      {
        userAgent: 'Googlebot-Image',
        disallow: '/',
        allow: ['/images/screenshot.jpg', '/favicon.ico'],
      },
      {
        userAgent: 'YandexImages',
        disallow: '/',
        allow: ['/images/screenshot.jpg', '/favicon.ico'],
      },
    ],
    sitemap: 'https://foydabroker.uz/sitemap.xml',
  };
}
