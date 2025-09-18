'use client';

import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import { useIsDesktop } from '@/hooks/useIsDesktop';
import { FinancialOrganization } from '@/modules/admin/payload.types';

import FinancialOrganizationCard from '../FinancialOrganizationCard';

import styles from './styles.module.scss';

interface FinancialOrganizationsGalleryProps {
  financialOrganizations: FinancialOrganization[];
}

const FinancialOrganizationsGallery: React.FC<
  FinancialOrganizationsGalleryProps
> = ({ financialOrganizations }) => {
  const isDesktop = useIsDesktop();

  return (
    <>
      {isDesktop && (
        <div className={styles.financialOrganizations}>
          {financialOrganizations.map((it) => (
            <FinancialOrganizationCard
              key={it.id}
              {...it}
            />
          ))}
        </div>
      )}

      {!isDesktop && (
        <Swiper
          slidesPerView="auto"
          className={styles.swiper}
          spaceBetween={24}
        >
          {financialOrganizations.map((it) => (
            <SwiperSlide
              key={it.id}
              className={styles.swiperSlide}
            >
              <FinancialOrganizationCard
                {...it}
                isDesktop={isDesktop}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default FinancialOrganizationsGallery;
