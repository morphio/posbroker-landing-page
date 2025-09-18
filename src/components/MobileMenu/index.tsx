'use client';

import { useTranslations } from 'next-intl';

import ChevronDownSvg from '@/assets/icons/chevron-down.svg';
import CloseSvg from '@/assets/icons/close.svg';
import AppButton from '@/components/AppButton';
import AppLogo from '@/components/AppLogo';
import ButtonWrapper from '@/components/ButtonWrapper';
import { Link, usePathname } from '@/i18n/navigation';

import styles from './styles.module.scss';

interface Props {
  isOpen: boolean;
  onToggle: (stage: boolean) => void;
}

export default function MobileMenu(props: Props) {
  const { isOpen, onToggle } = props;

  const pathname = usePathname();
  const t = useTranslations();

  const items = [
    { label: t('menu.buyers'), url: '/' },
    { label: t('menu.sellers'), url: '/sellers' },
    { label: t('menu.organisations'), url: '/organisations' },
  ];

  function close() {
    onToggle(false);
  }

  return (
    <div className={[styles.mobileMenu, isOpen && styles.open].join(' ')}>
      <div className={styles.container}>
        <div className={styles.topBox}>
          <div className={styles.header}>
            <AppLogo
              className={styles.logoIcon}
              onClick={close}
            />
            <ButtonWrapper
              onClick={close}
              ariaLabel={'Close mobile menu'}
            >
              <CloseSvg className={styles.closeIcon} />
            </ButtonWrapper>
          </div>
          <nav className={styles.menu}>
            <ul className={styles.menuList}>
              {items.map((item, index) => (
                <li
                  className={[
                    styles.lsitItem,
                    pathname === item.url ? styles.active : '',
                  ].join(' ')}
                  key={index}
                >
                  <Link
                    className={styles.menuLink}
                    href={item.url}
                    onClick={close}
                  >
                    <span>{item.label}</span>
                    <ChevronDownSvg className={styles.menuIcon} />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.contactsBox}>
            <span className={styles.contactsBoxTitle}>{t('questions')}</span>
            <a href="mailto:rahmat@foydabroker.uz">rahmat@foydabroker.uz</a>
          </div>
        </div>

        <AppButton label={t('personalCabinet')} />
      </div>
    </div>
  );
}
