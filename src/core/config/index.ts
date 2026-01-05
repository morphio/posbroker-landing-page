export const APP_CONFIG = {
  API_URL: process.env.NEXT_PUBLIC_API_BASE_URL ?? '/api',
  RELEASE_DATE: process.env.NEXT_PUBLIC_RELEASE_DATE ?? 'unknown',
  LK_URL: process.env.NEXT_PUBLIC_LK_URL ?? 'https://lk.foydabroker.uz',
  SITE_URL: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://foydabroker.uz').startsWith('http')
    ? (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://foydabroker.uz')
    : `https://${process.env.NEXT_PUBLIC_SITE_URL}`,
  DOCS_URL: process.env.NEXT_PUBLIC_DOCS_URL ?? '/docs',
} as const;
