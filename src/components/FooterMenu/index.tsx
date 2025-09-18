import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

import styles from './styles.module.scss';

export default function FooterMenu() {
  const t = useTranslations();

  const items = [
    { label: t('menu.buyers'), url: '/' },
    { label: t('menu.sellers'), url: '/sellers' },
    { label: t('menu.organisations'), url: '/organisations' },
  ];

  return (
    <nav className={styles.footerMenu}>
      <ul className={styles.list}>
        {items.map((item, index) => (
          <li
            className={styles.item}
            key={index}
          >
            <Link
              className={styles.link}
              href={item.url}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
