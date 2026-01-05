import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

import { messages as ruMessages } from '../messages/ru/index';
import { messages as uzMessages } from '../messages/uz/index';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  const messages = locale === 'ru' ? ruMessages : uzMessages;

  return {
    locale,
    timeZone: 'Asia/Tashkent',
    messages,
  };
});
