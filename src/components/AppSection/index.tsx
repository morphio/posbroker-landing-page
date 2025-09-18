import React from 'react';

import styles from './styles.module.scss';

interface Props {
  children: React.ReactNode;
  title?: string;
  className?: string;
  id?: string;
  transparent?: boolean;
}

export default function AppSection(props: Props) {
  const { children, title, className, id, transparent = false } = props;

  return (
    <section
      id={id}
      className={[
        styles.appSection,
        className,
        transparent && styles._transparent,
      ].join(' ')}
    >
      <div className={styles.container}>
        {title && <h2 className={styles.title}>{title}</h2>}
        {children}
      </div>
    </section>
  );
}
