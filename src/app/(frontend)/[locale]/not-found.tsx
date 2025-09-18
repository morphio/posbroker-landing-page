import { useTranslations } from 'next-intl';

import ErrorNotFound from '@/components/ErrorNotFound';

import styles from './not-found.module.scss';

export default function NotFoundPage() {
  const t = useTranslations('notFound');

  return (
    <div className={styles.notFoundPage}>
      <ErrorNotFound
        title={t('pageNotFound')}
        goToMainText={t('goToMain')}
      />
    </div>
  );
}
