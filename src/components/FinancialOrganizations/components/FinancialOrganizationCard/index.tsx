import React from 'react';

import clsx from 'clsx';
import Image from 'next/image';

import { Link } from '@/i18n/navigation';
import { FinancialOrganization } from '../../types';

import styles from './styles.module.scss';

type FinancialOrganizationCardProps = {
  isDesktop?: boolean;
} & FinancialOrganization;

const FinancialOrganizationCardContainer: React.FC<
  React.PropsWithChildren & {
    link: FinancialOrganization['link'];
  } & React.HTMLAttributes<HTMLElement>
> = ({ children, link, ...props }) => {
  return link ? (
    <Link
      href={link}
      target="_blank"
      {...props}
    >
      {children}
    </Link>
  ) : (
    <div {...props}>{children}</div>
  );
};

const FinancialOrganizationCard: React.FC<FinancialOrganizationCardProps> = ({
  name,
  logo,
  link,
  label,
  isDesktop,
}) => {
  return (
    <FinancialOrganizationCardContainer
      className={clsx(
        styles.financialOrganizationCard,
        !isDesktop && styles.mobile,
      )}
      link={link}
    >
      {label && (
        <div className={styles.labelContainer}>
          <span className={styles.label}>{label}</span>
        </div>
      )}

      {typeof logo !== 'number' && logo.url && (
        <Image
          height={isDesktop ? 72 : 64}
          src={logo.url}
          width={isDesktop ? 72 : 64}
          className={styles.image}
          alt={logo.alt ?? ''}
        />
      )}
      <span className={styles.name}>{name}</span>
    </FinancialOrganizationCardContainer>
  );
};

export default FinancialOrganizationCard;
