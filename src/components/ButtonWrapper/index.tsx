import React, { MouseEventHandler } from 'react';

import styles from './styles.module.scss';

interface Props {
  children: React.ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  ariaLabel?: string;
}

export default function ButtonWrapper(props: Props) {
  const { children, onClick, className, ariaLabel = 'Button' } = props;

  return (
    <button
      className={[styles.buttonWrapper, className].join(' ')}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
