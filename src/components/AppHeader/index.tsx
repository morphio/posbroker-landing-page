'use client';

import { useEffect, useRef, useState } from 'react';

import { useLocale, useTranslations } from 'next-intl';

import MenuSvg from '@/assets/icons/menu.svg';
import AppButton from '@/components/AppButton';
import AppLogo from '@/components/AppLogo';
import ButtonWrapper from '@/components/ButtonWrapper';
import HeaderMenu from '@/components/HeaderMenu';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import MobileMenu from '@/components/MobileMenu';
import { APP_CONFIG } from '@/core/config';

import styles from './styles.module.scss';

interface Props {
  className?: string;
}

export default function AppHeader(props: Props) {
  const { className } = props;

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isStickyActive, setIsStickyActive] = useState<boolean>(false);
  const t = useTranslations();
  const locale = useLocale();
  const header = useRef<HTMLHeadElement | null>(null);

  function toggleHandler(stage: boolean) {
    setIsMenuOpen(stage);
  }

  function changeHeaderOnScroll(): void {
    if (header.current) {
      setIsStickyActive(header.current.getBoundingClientRect().top === 0);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', changeHeaderOnScroll);

    return () => {
      window.removeEventListener('scroll', changeHeaderOnScroll);
    };
  }, []);

  return (
    <header
      className={[
        styles.appHeader,
        isStickyActive && styles.stickyActive,
        className,
      ].join(' ')}
      ref={header}
    >
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.leftBox}>
            <ButtonWrapper
              className={styles.burgerBtn}
              ariaLabel="Open mobile menu"
              onClick={() => toggleHandler(true)}
            >
              <MenuSvg className={styles.menuIcon} />
            </ButtonWrapper>
            <AppLogo className={styles.appLogo} />
          </div>
          <HeaderMenu className={styles.menu} />
          <div className={styles.rightBox}>
            <LanguageSwitcher currentLocale={locale} />
            <AppButton
              className={styles.lkButton}
              label={t('personalCabinet')}
              isSmall={true}
              target="_blank"
              href={APP_CONFIG.LK_URL}
            />
          </div>
        </div>
      </div>
      <MobileMenu
        isOpen={isMenuOpen}
        onToggle={toggleHandler}
      />
    </header>
  );
}
