import React from 'react';

import styles from './styles.module.scss';

export interface InfoItem {
  title: string;
  value: string;
}

interface Props {
  title: string;
  subtitle: string | React.ReactNode;
  infoItems?: InfoItem[];
  underTitle?: string;
  leftBox: React.ReactNode;
  rightBox: React.ReactNode;
}

export default function HeroBanner(props: Props) {
  const { infoItems, title, subtitle, underTitle, leftBox, rightBox } = props;

  return (
    <div className={styles.heroBanner}>
      <div className={styles.topBox}>
        <div className={styles.leftBox}>
          {underTitle && (
            <span className={styles.underTitle}>{underTitle}</span>
          )}
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.subtitle}>{subtitle}</div>
          {leftBox}
        </div>
        <div className={styles.rightBox}>{rightBox}</div>
      </div>
      {infoItems && (
        <div className={styles.bottomBox}>
          {infoItems.map((infoItem, index) => (
            <div
              key={index}
              className={styles.info}
            >
              <span className={styles.infoTitle}>{infoItem.title}</span>
              <span className={styles.infoValue}>{infoItem.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
