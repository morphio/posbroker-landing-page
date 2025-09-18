'use client';

import AppLogoSvg from '@/assets/icons/app-logo.svg';
import { Link, usePathname } from '@/i18n/navigation';

import styles from './styles.module.scss';

interface Props {
  className?: string;
  onClick?: () => void;
}

export default function AppLogo(props: Props) {
  const { className, onClick } = props;
  const pathname = usePathname();

  if (pathname === '/') {
    return <AppLogoSvg className={className} />;
  }

  return (
    <Link
      className={styles.appLogo}
      href="/"
      onClick={onClick}
    >
      <AppLogoSvg className={className} />
    </Link>
  );
}
