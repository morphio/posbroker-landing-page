const getEnvVar = (key: string, defaultValue: string) => {
  const value = process.env[key];
  return value && value.trim() !== '' ? value : defaultValue;
};

const getSiteUrl = () => {
  const url = getEnvVar('NEXT_PUBLIC_SITE_URL', 'https://foydabroker.uz');
  return url.startsWith('http') ? url : `https://${url}`;
};

export const APP_CONFIG = {
  API_URL: getEnvVar('NEXT_PUBLIC_API_BASE_URL', '/api'),
  RELEASE_DATE: getEnvVar('NEXT_PUBLIC_RELEASE_DATE', 'unknown'),
  LK_URL: getEnvVar('NEXT_PUBLIC_LK_URL', 'https://lk.foydabroker.uz'),
  SITE_URL: getSiteUrl(),
  DOCS_URL: getEnvVar('NEXT_PUBLIC_DOCS_URL', '/docs'),
} as const;
