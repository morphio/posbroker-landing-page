import { beforeEach, describe, expect, it, vi } from 'vitest';

import { generateSitemap } from './generateSitemap';
import { ISitemapConfig } from './types';

const mockDate = new Date(2025, 0, 1);

describe('generateSitemapWithLangs', () => {
  const host = 'https://example.com';
  const languages = ['en', 'es'];

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
  });

  describe('with default lang', () => {
    const defaultLang = 'en';

    it('should generate sitemap with correct URLs and alternatives for all languages', () => {
      const routes: ISitemapConfig['routes'] = [
        { path: '' },
        { path: 'about' },
        { path: 'blog' },
      ];

      const config: ISitemapConfig = {
        host,
        languages,
        defaultLang,
        routes,
      };

      const sitemap = generateSitemap(config);

      expect(sitemap).toEqual([
        // en
        {
          url: host,
          lastModified: mockDate,
          alternates: {
            languages: {
              en: host,
              es: `${host}/es`,
            },
          },
        },
        {
          url: `${host}/about`,
          lastModified: mockDate,
          alternates: {
            languages: {
              en: `${host}/about`,
              es: `${host}/es/about`,
            },
          },
        },
        {
          url: `${host}/blog`,
          lastModified: mockDate,
          alternates: {
            languages: {
              en: `${host}/blog`,
              es: `${host}/es/blog`,
            },
          },
        },

        // es
        {
          url: `${host}/es`,
          lastModified: mockDate,
          alternates: {
            languages: {
              en: host,
              es: `${host}/es`,
            },
          },
        },
        {
          url: `${host}/es/about`,
          lastModified: mockDate,
          alternates: {
            languages: {
              en: `${host}/about`,
              es: `${host}/es/about`,
            },
          },
        },
        {
          url: `${host}/es/blog`,
          lastModified: mockDate,
          alternates: {
            languages: {
              en: `${host}/blog`,
              es: `${host}/es/blog`,
            },
          },
        },
      ]);
    });
    it('should correctly generate sitemap for nested routes', () => {
      const nestedRoutes: ISitemapConfig['routes'] = [
        {
          path: '',
          children: [
            {
              path: 'about',
              children: [{ path: 'blog' }],
            },
          ],
        },
      ];

      const config: ISitemapConfig = {
        host,
        languages,
        defaultLang,
        routes: nestedRoutes,
      };

      const sitemap = generateSitemap(config);

      expect(sitemap).toEqual([
        // en
        {
          url: host,
          lastModified: mockDate,
          alternates: {
            languages: {
              en: host,
              es: `${host}/es`,
            },
          },
        },
        {
          url: `${host}/about`,
          lastModified: mockDate,
          alternates: {
            languages: {
              en: `${host}/about`,
              es: `${host}/es/about`,
            },
          },
        },
        {
          url: `${host}/about/blog`,
          lastModified: mockDate,
          alternates: {
            languages: {
              en: `${host}/about/blog`,
              es: `${host}/es/about/blog`,
            },
          },
        },

        // es
        {
          url: `${host}/es`,
          lastModified: mockDate,
          alternates: {
            languages: {
              en: host,
              es: `${host}/es`,
            },
          },
        },
        {
          url: `${host}/es/about`,
          lastModified: mockDate,
          alternates: {
            languages: {
              en: `${host}/about`,
              es: `${host}/es/about`,
            },
          },
        },
        {
          url: `${host}/es/about/blog`,
          lastModified: mockDate,
          alternates: {
            languages: {
              en: `${host}/about/blog`,
              es: `${host}/es/about/blog`,
            },
          },
        },
      ]);
    });
  });

  describe('without default lang', () => {
    const defaultLang = '';

    it('should generate sitemap with correct URLs and alternatives for all languages', () => {
      const routes: ISitemapConfig['routes'] = [
        { path: '' },
        { path: 'about' },
      ];
      const config: ISitemapConfig = { host, languages, defaultLang, routes };

      const sitemap = generateSitemap(config);

      expect(sitemap).toEqual([
        // en
        {
          url: `${host}/en`,
          lastModified: mockDate,
          alternates: {
            languages: {
              es: `${host}/es`,
              en: `${host}/en`,
            },
          },
        },
        {
          url: `${host}/en/about`,
          lastModified: mockDate,
          alternates: {
            languages: {
              es: `${host}/es/about`,
              en: `${host}/en/about`,
            },
          },
        },

        // es
        {
          url: `${host}/es`,
          lastModified: mockDate,
          alternates: {
            languages: {
              en: `${host}/en`,
              es: `${host}/es`,
            },
          },
        },
        {
          url: `${host}/es/about`,
          lastModified: mockDate,
          alternates: {
            languages: {
              en: `${host}/en/about`,
              es: `${host}/es/about`,
            },
          },
        },
      ]);
    });
    it('should correctly generate sitemap for nested routes', () => {
      const nestedRoutes: ISitemapConfig['routes'] = [
        {
          path: '',
          children: [
            {
              path: 'about',
              children: [{ path: 'blog' }],
            },
          ],
        },
      ];

      const config: ISitemapConfig = {
        host,
        languages,
        defaultLang,
        routes: nestedRoutes,
      };

      const sitemap = generateSitemap(config);

      expect(sitemap).toEqual([
        // en
        {
          url: `${host}/en`,
          lastModified: mockDate,
          alternates: {
            languages: {
              en: `${host}/en`,
              es: `${host}/es`,
            },
          },
        },
        {
          url: `${host}/en/about`,
          lastModified: mockDate,
          alternates: {
            languages: {
              en: `${host}/en/about`,
              es: `${host}/es/about`,
            },
          },
        },
        {
          url: `${host}/en/about/blog`,
          lastModified: mockDate,
          alternates: {
            languages: {
              en: `${host}/en/about/blog`,
              es: `${host}/es/about/blog`,
            },
          },
        },

        // es
        {
          url: `${host}/es`,
          lastModified: mockDate,
          alternates: {
            languages: {
              en: `${host}/en`,
              es: `${host}/es`,
            },
          },
        },
        {
          url: `${host}/es/about`,
          lastModified: mockDate,
          alternates: {
            languages: {
              en: `${host}/en/about`,
              es: `${host}/es/about`,
            },
          },
        },
        {
          url: `${host}/es/about/blog`,
          lastModified: mockDate,
          alternates: {
            languages: {
              en: `${host}/en/about/blog`,
              es: `${host}/es/about/blog`,
            },
          },
        },
      ]);
    });
  });
});
