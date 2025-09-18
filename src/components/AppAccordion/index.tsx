'use client';

import React, { useRef, useState } from 'react';

import ChevronDownSvg from '@/assets/icons/chevron-down.svg';

import styles from './styles.module.scss';

interface Props {
  title: string;
  children: string | number | React.ReactNode;
  className?: string;
}

export default function AppAccordion(props: Props) {
  const { title, children, className } = props;

  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggle = (): void => {
    setIsOpen(!isOpen);
  };

  const handleChildClick = (event: React.MouseEvent): void => {
    event.stopPropagation();
  };

  return (
    <div
      className={[styles.collapsible, className && className].join(' ')}
      onClick={toggle}
    >
      <span className={styles.collapsibleHeader}>
        {title}
        <div
          className={`${styles.collapsibleArrow} ${isOpen ? styles.open : ''}`}
        >
          <ChevronDownSvg className={styles.arrow} />
        </div>
      </span>
      <div
        ref={contentRef}
        className={styles.collapsibleContent}
        style={
          isOpen
            ? {
                height: `${contentRef.current ? contentRef.current.scrollHeight : 0}px`,
              }
            : { height: '0px' }
        }
      >
        <div
          className={styles.collapsibleContentInner}
          onClick={handleChildClick}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
