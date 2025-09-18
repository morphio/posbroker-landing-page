import { useTranslations } from 'next-intl';

import AppLogo from '@/components/AppLogo';
import FooterMenu from '@/components/FooterMenu';

import SocialMedia from '../SocialMedia';

import styles from './styles.module.scss';

interface Link {
  label: string;
  url: string;
}

interface Props {
  className?: string;
}

export default function AppFooter(props: Props) {
  const { className } = props;
  const t = useTranslations();

  const links = [
    {
      label: t('footer.privacy'),
      url: t('footer.privacyLink'),
    },
  ];

  return (
    <footer className={[styles.appFooter, className].join(' ')}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.infoBox}>
            <AppLogo className={styles.appLogo} />
            <div className={styles.contactsBox}>
              <span className={styles.contactsTitle}>
                {t('footer.questions')}
              </span>
              <a
                className={styles.email}
                href="mailto:rahmat@foydabroker.uz"
              >
                rahmat@foydabroker.uz
              </a>
              <a
                className={styles.phone}
                href="tel:+998903383443"
              >
                +998 90 338-34-43
              </a>
            </div>
            <div className={styles.footerMenuContainer}>
              <FooterMenu />
            </div>
            <div className={styles.socialMediaContainer}>
              <SocialMedia />
            </div>
          </div>
          <div className={[styles.line, styles.secondLine].join(' ')}>
            <span>
              {t('footer.copyright', { year: new Date().getFullYear() })}
            </span>
            <ul className={styles.links}>
              {links.map((link: Link, index: number) => (
                <li
                  key={index}
                  className={styles.linkItem}
                >
                  <a
                    className={styles.link}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
