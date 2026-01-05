import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  // Use static imports for messages to avoid bundling issues
  let messages;
  try {
    if (locale === 'ru') {
      messages = (await import('../messages/ru/index')).messages;
    } else if (locale === 'uz') {
      messages = (await import('../messages/uz/index')).messages;
    } else {
      notFound();
    }
  } catch (error) {
    console.error('Failed to load messages:', error);
    notFound();
  }

  return {
    locale,
    timeZone: 'Asia/Tashkent',
    messages,
  };
});
