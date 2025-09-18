import { useTranslations } from 'next-intl';

import FeedbacksSlider, { Feedback } from '@/components/FeedbacksSlider';
import RatingNumber from '@/components/RatingNumber';
import RatingStars from '@/components/RatingStars';

import styles from './styles.module.scss';

interface Props {
  className?: string;
}

export default function SliderWithRating(props: Props) {
  const { className } = props;
  const t = useTranslations('buyers');

  const feedbacks: Feedback[] = [
    {
      text: t('slider.1.text'),
      name: t('slider.1.name'),
      occupation: t('slider.1.info'),
      color: '#FFC24A',
      image: '/images/Pic_2.webp',
    },
    {
      text: t('slider.2.text'),
      name: t('slider.2.name'),
      occupation: t('slider.2.info'),
      color: '#FFBF80',
      image: '/images/Pic_3.webp',
    },
    {
      text: t('slider.0.text'),
      name: t('slider.0.name'),
      occupation: t('slider.0.info'),
      color: '#FF8589',
      image: '/images/Pic_1.webp',
    },
    {
      text: t('slider.3.text'),
      name: t('slider.3.name'),
      occupation: t('slider.3.info'),
      color: '#5ACD9D',
      image: '/images/Pic_4.webp',
    },
    {
      text: t('slider.4.text'),
      name: t('slider.4.name'),
      occupation: t('slider.4.info'),
      color: '#53B1FD',
      image: '/images/Pic_5.webp',
    },
  ];

  return (
    <div className={[styles.sliderWithRating, className].join(' ')}>
      <div className={styles.ratingBox}>
        <RatingNumber
          value={4.9}
          max={5}
          big
        />
        <RatingStars
          className={styles.stars}
          value={5}
          max={5}
        />
        <span className={styles.text}>{t('ratingBox.hint')}</span>
      </div>
      <FeedbacksSlider feedbacks={feedbacks} />
    </div>
  );
}
