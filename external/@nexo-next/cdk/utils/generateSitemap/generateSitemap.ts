import { MetadataRoute } from 'next';
import { Languages } from 'next/dist/lib/metadata/types/alternative-urls-types';

import { ISitemapConfig } from './types';

function isDefaultLocale(candidate: string, defaultLang: string): boolean {
  return candidate.toLowerCase() === defaultLang.toLowerCase();
}

function getLocalePath(locale: string, defaultLang: string): string {
  return isDefaultLocale(locale, defaultLang) ? '' : locale;
}

function createPath(...params: string[]): string {
  return params.filter(Boolean).join('/');
}

function generateLanguages(
  postfixPath: string,
  options: ISitemapConfig,
): Languages<string> {
  // https://developers.google.com/search/docs/specialty/international/localized-versions?hl=ru
  return options.languages.reduce<Languages<string>>((acc, lang) => {
    return {
      ...acc,
      [lang]: createPath(
        options.host,
        getLocalePath(lang, options.defaultLang),
        postfixPath,
      ),
    };
  }, {});
}

function createAlternatives(
  locale: string,
  options: ISitemapConfig,
  postfixPath = '',
): MetadataRoute.Sitemap[number] {
  return {
    url: createPath(
      options.host,
      getLocalePath(locale, options.defaultLang),
      postfixPath,
    ),
    lastModified: new Date(),
    alternates: {
      languages: generateLanguages(postfixPath, options),
    },
  };
}

function recursivePath(
  acc: MetadataRoute.Sitemap,
  locale: string,
  routes: ISitemapConfig['routes'],
  prefixPath: string,
  options: ISitemapConfig,
) {
  for (const { path, children } of routes) {
    const postfixPath = createPath(prefixPath, path);
    const route = createAlternatives(locale, options, postfixPath);
    acc.push(route);

    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    recursivePath(acc, locale, children || [], postfixPath, options);
  }
}

export function generateSitemap(
  options: ISitemapConfig,
): MetadataRoute.Sitemap {
  return options.languages.reduce<MetadataRoute.Sitemap>((acc, locale) => {
    recursivePath(acc, locale, options.routes, '', options);

    return acc;
  }, []);
}
