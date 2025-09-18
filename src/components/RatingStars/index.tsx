import { useTranslations } from 'next-intl';

import StarSvg from '@/assets/icons/star.svg';

import styles from './styles.module.scss';

interface Props {
  value: number;
  max: number;
  className?: string;
  starClassName?: string;
}

export default function RatingStars(props: Props) {
  const { value, max, className, starClassName } = props;
  const t = useTranslations('buyers');

  return (
    <span className={[styles.ratingStars, className].join(' ')}>
      <div className={styles.stars}>
        {max > 0 &&
          Array.from({ length: max }).map((_, index) => (
            <StarSvg
              key={index}
              className={[
                styles.star,
                starClassName && starClassName,
                index < value ? styles.active : '',
              ].join(' ')}
            />
          ))}
      </div>
      <span>{t('ratingBox.usersEstimation')}</span>
    </span>
  );
}
