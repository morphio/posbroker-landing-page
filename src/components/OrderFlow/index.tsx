import React from 'react';

import ArrowSvg from '@/assets/icons/arrow.svg';
import CircleInfoBox, { CircleInfoBoxData } from '@/components/CircleInfoBox';

import styles from './styles.module.scss';

interface Props {
  items: CircleInfoBoxData[];
  showArrow?: boolean;
}

export default function OrderFlow(props: Props) {
  const { items, showArrow } = props;

  return (
    <div className={styles.orderFlow}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <CircleInfoBox
            className={styles.circleInfoBox}
            title={item.title}
            image={item.image}
            step={index + 1}
          />
          {showArrow && index !== items.length - 1 && (
            <ArrowSvg className={styles.arrow} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
