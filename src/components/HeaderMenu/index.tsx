import { useTranslations } from 'next-intl';

import { Link, usePathname } from '@/i18n/navigation';

import styles from './styles.module.scss';

interface Props {
  className?: string;
}

export default function HeaderMenu(props: Props) {
  const { className } = props;
  const t = useTranslations();
  const pathname = usePathname();

  const items = [
    { label: t('menu.buyers'), url: '/' },
    { label: t('menu.sellers'), url: '/sellers' },
    { label: t('menu.organisations'), url: '/organisations' },
  ];

  return (
    <nav className={[styles.headerMenu, className].join(' ')}>
      <ul className={styles.list}>
        {items.map((item, index) => (
          <li
            className={`${styles.item} ${pathname === item.url ? styles.active : ''}`}
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
