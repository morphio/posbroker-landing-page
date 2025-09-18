import Image from 'next/image';

import QuotesSvg from '@/assets/icons/quotes.svg';

import styles from './styles.module.scss';

export interface FeedbackCardData {
  image: string;
  feedback: string;
  name: string;
  description: string;
  backgroundColor: string;
  className?: string;
}

export default function FeedbackCard(props: FeedbackCardData) {
  const { image, feedback, name, description, backgroundColor, className } =
    props;

  return (
    <div
      className={[styles.feedbackCard, className].join(' ')}
      style={{ '--card-bg-color': backgroundColor } as React.CSSProperties}
    >
      <div className={styles.shadowWrapper}>
        <div className={styles.topBox}>
          <Image
            className={styles.image}
            src={image}
            alt={`${name}'s feedback`}
            width={337}
            height={396}
          />
        </div>
        <div className={styles.bottomBox}>
          <QuotesSvg className={styles.quotesIcon} />
          <div className={styles.quote}>
            <span className={styles.feedback}>{feedback}</span>
            <span className={styles.line}>
              <span className={styles.name}>{name}</span>
              <span> | </span>
              <span className={styles.description}>{description}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
