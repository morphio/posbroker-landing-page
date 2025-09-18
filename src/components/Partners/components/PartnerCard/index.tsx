import React from 'react';

import clsx from 'clsx';

import AppTooltip from '@/components/AppTooltip';
import { Link } from '@/i18n/navigation';
import { Partner } from '@/modules/admin/payload.types';

import styles from './styles.module.scss';

const PartnerContainer: React.FC<
  React.PropsWithChildren & {
    link: Partner['link'];
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

type PartnerCardProps = {
  isDesktop?: boolean;
} & Partner;

const PartnerCard: React.FC<PartnerCardProps> = ({
  logo,
  name,
  category,
  label,
  link,
  isDesktop,
}) => {
  return (
    <PartnerContainer
      link={link}
      className={clsx(styles.partnerCard, !isDesktop && styles.mobile)}
    >
      {label && (
        <div className={styles.labelContainer}>
          <span className={styles.label}>{label}</span>
        </div>
      )}

      <div className={styles.logoContainer}>
        {typeof logo !== 'number' && logo.url && (
          <img
            src={logo.url}
            alt={logo.alt ?? ''}
            className={styles.logo}
          />
        )}
      </div>

      <div className={styles.info}>
        <AppTooltip
          size={'s'}
          fullWidth
          text={name}
          appearance={'default'}
        >
          <span className={styles.name}>{name}</span>
        </AppTooltip>

        {typeof category !== 'number' && (
          <span className={styles.category}>{category.name}</span>
        )}
      </div>
    </PartnerContainer>
  );
};

export default PartnerCard;
