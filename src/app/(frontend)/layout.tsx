import { Metadata } from 'next';
import 'swiper/css';

import '@/assets/styles/main.scss';

import { APP_CONFIG } from '@/core/config';

export const metadata: Metadata = {
  // TODO: Move to .env variable
  metadataBase: new URL(APP_CONFIG.SITE_URL),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
