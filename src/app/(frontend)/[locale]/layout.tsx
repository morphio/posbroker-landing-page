import { Suspense } from 'react';

import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';

import AppFooter from '@/components/AppFooter';
import AppHeader from '@/components/AppHeader';
import GTMNonScript from '@/components/GTMNonScript';
import GTMScript from '@/components/GTMScript';
import YandexMetrika from '@/components/YandexMetrika';
import { APP_CONFIG } from '@/core/config';

import styles from './layout.module.scss';

const inter = Inter({ subsets: ['latin'] });

const schemaData: Record<string, object> = {
  ru: {
    '@context': 'http://www.schema.org',
    '@type': 'Organization',
    name: 'FoyDa',
    url: 'https://foydabroker.uz/ru',
    description:
      'Это сервис делающий приобретение товаров или услуг в рассрочку комфортным и быстрым. Мы сотрудничаем с несколькими банками и финансовыми организациями для повышения вероятности одобрения рассрочки. Наша цель - помочь вам сделать желанную покупку быстро и комфортно для семейного бюджета',
    email: 'rahmat@foydabroker.uz',
  },
  uz: {
    '@context': 'http://www.schema.org',
    '@type': 'Organization',
    name: 'FoyDa',
    url: 'https://foydabroker.uz/uz',
    description:
      'Bu xizmat tovarlar yoki xizmatlarni bo‘lib-bo‘lib sotib olishni qulay va tez amalga oshiradi. Biz bo‘lib-bo‘lib to‘lashni tasdiqlash ehtimolini oshirish uchun bir nechta bank va moliyaviy tashkilotlar bilan hamkorlik qilamiz. Bizning maqsadimiz — xohlagan xaridingizni oila byudjetiga qulay tarzda tezda amalga oshirishga yordam berishdir.',
    email: 'rahmat@foydabroker.uz',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: {
      default: `${t('meta.title')} - ${t('buyers.meta.title')}`,
      template: `${t('meta.title')} - %s`,
    },
    description: t('meta.description'),
    keywords: t('meta.keywords'),
    alternates: {
      canonical: `https://foydabroker.uz/${locale}`,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();
  const isDev = process.env.NODE_ENV === 'development';
  const jsonLd = schemaData[locale];

  return (
    <html
      lang={locale}
      data-release={APP_CONFIG.RELEASE_DATE}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <GTMScript />
      </head>
      <body className={inter.className}>
        <GTMNonScript />
        <NextIntlClientProvider messages={messages}>
          <div className={styles.layout}>
            <AppHeader className={styles.header} />
            <main className={styles.main}>{children}</main>
            <AppFooter className={styles.footer} />
          </div>
          {!isDev && (
            <Suspense>
              <YandexMetrika />
            </Suspense>
          )}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
