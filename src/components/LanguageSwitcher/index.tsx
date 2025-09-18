'use client';

import { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import ChevronSvg from '@/assets/icons/chevron-down.svg';
import { usePathname } from '@/i18n/navigation';

import styles from './styles.module.scss';

interface Props {
  currentLocale: string;
  className?: string;
}

export default function LanguageSwitcher(props: Props) {
  const { currentLocale, className } = props;

  const router = useRouter();
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement | null>(null);
  const listNodeRef = useRef<HTMLUListElement | null>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const locales = ['ru', 'uz'];

  const setOption = (code: string) => {
    router.push(`/${code}${pathname}`);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleOutSideClick = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as HTMLDivElement)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('mousedown', handleOutSideClick);

    return () => {
      window.removeEventListener('mousedown', handleOutSideClick);
    };
  }, [ref]);

  return (
    <div
      className={[styles.languageSwitcher, className && className].join(' ')}
      ref={ref}
    >
      <span
        className={`${styles.displayedBox} ${isOpen ? styles.active : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{currentLocale}</span>
        <ChevronSvg
          className={styles.icon}
          width={20}
          height={20}
        />
      </span>

      {isOpen && (
        <ul
          className={styles.list}
          ref={listNodeRef}
        >
          {locales.map((locale) => {
            const isActive = locale === currentLocale;

            return (
              <li key={locale}>
                <button
                  className={`${styles.button} ${isActive ? styles.active : ''}`}
                  onClick={() => !isActive && setOption(locale)}
                >
                  {locale}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
