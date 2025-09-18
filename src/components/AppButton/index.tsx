import React from 'react';

import Link, { LinkProps } from 'next/link';

import CircleSvg from '@/assets/icons/circle.svg';

import styles from './styles.module.scss';

export interface Props {
  children?: React.ReactNode;
  label?: string;
  color?: 'white' | 'black';
  isSmall?: boolean;
  isActive?: boolean;
  className?: string;
  href?: LinkProps['href'];
  onClick?: () => void;
  target?: '_blank';
  disabled?: boolean;
  loading?: boolean;
  variant?: 'brand-accent' | 'outline';
}

export default function AppButton(props: Props) {
  const {
    children,
    label,
    isActive = false,
    isSmall = false,
    href,
    className,
    target,
    disabled = false,
    loading = false,
    variant = 'brand-accent',
    onClick,
  } = props;

  const commonProps = {
    className: [
      styles.appButton,
      isActive && styles.active,
      className && className,
      isSmall && styles.small,
      disabled && styles.disabled,
      loading && styles.loading,
      variant === 'outline' && styles.outline,
    ].join(' '),
    disabled: disabled || loading,
    onClick,
  };

  return href ? (
    <Link
      href={href}
      target={target}
      {...commonProps}
    >
      {loading ? <CircleSvg className={styles.loader} /> : (children ?? label)}
    </Link>
  ) : (
    <button
      type="button"
      {...commonProps}
    >
      {loading ? <CircleSvg className={styles.loader} /> : (children ?? label)}
    </button>
  );
}
