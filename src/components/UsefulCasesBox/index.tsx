import { useTranslations } from 'next-intl';

import UsefulCases from '@/components/UsefulCases';

import styles from './styles.module.scss';

export default function UsefulCasesBox() {
  const t = useTranslations('organisations');

  return (
    <div className={styles.usefulCasesBox}>
      <div className={styles.topBox}>
        <h2 className={styles.title}>{t('usefulSection.title')}</h2>
        <span className={styles.text}>{t('usefulSection.text')}</span>
        <span className={styles.ifText}>{t('usefulSection.ifText')}</span>
      </div>
      <UsefulCases />
    </div>
  );
}
