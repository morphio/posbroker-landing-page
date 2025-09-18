import styles from './styles.module.scss';

export interface CircleInfoBoxData {
  title: string;
  image: React.ElementType;
  step?: string | number;
  className?: string;
}

export default function CircleInfoBox(props: CircleInfoBoxData) {
  const { title, image: ImageSvg, step, className } = props;

  return (
    <div className={[styles.circleInfoBox, className].join(' ')}>
      <div
        className={styles.imageBox}
        data-step={step}
      >
        <ImageSvg className={styles.image} />
      </div>
      <div className={styles.title}>{title}</div>
    </div>
  );
}
