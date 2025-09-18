import { useTranslations } from 'next-intl';

import { APP_CONFIG } from '@/core/config';

import AppButton from '../AppButton';

import styles from './styles.module.scss';

export default function DocsSection() {
  const t = useTranslations('organisations');

  return (
    <>
      <span className={styles.docsSubtitle}>{t('docs.subtitle')}</span>
      <AppButton
        className={styles.button}
        href={APP_CONFIG.DOCS_URL}
        target="_blank"
        variant="outline"
      >
        {t('docs.buttonLink')}
      </AppButton>
    </>
  );
}
