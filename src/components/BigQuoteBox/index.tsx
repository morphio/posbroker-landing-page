import Image from 'next/image';

import UnionSvg from '@/assets/icons/union.svg';

import styles from './styles.module.scss';

interface Props {
  text: string;
  name: string;
  designation: string;
  imgUrl: string;
}

export default function BigQuoteBox(props: Props) {
  const { text, name, designation, imgUrl } = props;

  return (
    <div className={styles.bigQuoteBox}>
      <div className={styles.topBox}>
        <span className={styles.text}>{text}</span>
        <UnionSvg className={styles.unionSvg} />
      </div>

      <div className={styles.bottomBox}>
        <Image
          className={styles.img}
          src={imgUrl}
          width={120}
          height={120}
          alt="quote"
        />
        <div className={styles.userInfo}>
          <span className={styles.name}>{name}</span>
          <span className={styles.description}>{designation}</span>
        </div>
      </div>
    </div>
  );
}
