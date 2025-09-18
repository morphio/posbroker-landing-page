import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import { routing } from './routing';

interface Messages {
  [key: string]: string | Messages;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;

  if (!hasLocale(routing.locales, requested)) {
    notFound();
  }

  const locale = requested;

  const importedModule = (await import(`../messages/${locale}/index.ts`)) as {
    messages: Messages;
  };
  const messages = importedModule.messages;

  return {
    locale,
    timeZone: 'Asia/Tashkent',
    messages,
  };
});
