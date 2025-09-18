import { useTranslations } from 'next-intl';

import ErrorIconSg from '@/assets/icons/error-icon.svg';
import SuccessIconSvg from '@/assets/icons/success-icon.svg';

import styles from './styles.module.scss';

interface Props {
  error?: boolean;
}

export default function SendFormMessage(props: Props) {
  const { error = false } = props;

  const t = useTranslations();

  return (
    <div className={[styles.sendFormMessage, error && styles.error].join(' ')}>
      {error ? (
        <>
          <ErrorIconSg className={styles.icon} />
          <span className={styles.title}>{t('formMessage.error.title')}</span>
          <span className={styles.subtitle}>
            {t('formMessage.error.subtitle')}
          </span>
        </>
      ) : (
        <>
          <SuccessIconSvg className={styles.icon} />
          <span className={styles.title}>{t('formMessage.success.title')}</span>
          <span className={styles.subtitle}>
            {t('formMessage.success.subtitle')}
          </span>
        </>
      )}
    </div>
  );
}
