import { Metadata } from 'next';
import 'swiper/css';

import '@/assets/styles/main.scss';

export const metadata: Metadata = {
  // TODO: Move to .env variable
  metadataBase: new URL('https://foydabroker.uz'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
