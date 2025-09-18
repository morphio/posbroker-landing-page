import NotFoundSvg from '@/assets/icons/not-found.svg';
import AppButton from '@/components/AppButton';

import styles from './styles.module.scss';

interface Props {
  title?: string;
  goToMainText?: string;
}

export default function ErrorNotFound(props: Props) {
  const { title = 'Sahifa topilmadi', goToMainText = 'Bosh sahifaga' } = props;

  return (
    <div className={styles.errorNotFound}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <NotFoundSvg className={styles.image} />
          <h2 className={styles.subtitle}>{title}</h2>
          <AppButton
            className={styles.button}
            label={goToMainText}
            href="/"
          />
        </div>
      </div>
    </div>
  );
}
