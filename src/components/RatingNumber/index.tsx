import styles from './styles.module.scss';

interface Props {
  classNameMax?: string;
  classNameValue?: string;
  value: number;
  max: number;
  big?: boolean;
}

export default function RatingNumber(props: Props) {
  const { value, max, classNameValue, classNameMax, big = false } = props;

  return (
    <span className={[styles.ratingNumber, big && styles.big].join(' ')}>
      <span className={[styles.value, classNameValue].join(' ')}>
        {value.toString().replace('.', ',')}
      </span>
      <span className={[styles.max, classNameMax].join(' ')}>/{max}</span>
    </span>
  );
}
