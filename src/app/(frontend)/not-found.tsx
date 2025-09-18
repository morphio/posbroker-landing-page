import { Inter } from 'next/font/google';

import ErrorNotFound from '@/components/ErrorNotFound';

import './not-found.scss';
const inter = Inter({ subsets: ['latin'] });

export default function NotFound() {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorNotFound />
      </body>
    </html>
  );
}
