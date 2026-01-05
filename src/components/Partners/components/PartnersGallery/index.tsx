'use client';

import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import { useIsDesktop } from '@/hooks/useIsDesktop';
import { Partner } from '../../types';

import PartnerCard from '../PartnerCard';

import styles from './styles.module.scss';

interface PartnersGalleryProps {
  partners: Partner[];
}

const PartnersGallery: React.FC<PartnersGalleryProps> = ({ partners }) => {
  const isDesktop = useIsDesktop();

  return (
    <>
      {isDesktop && (
        <div className={styles.partners}>
          {partners.map((it) => (
            <PartnerCard
              key={it.id}
              isDesktop={isDesktop}
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
          {partners.map((it) => (
            <SwiperSlide
              key={it.id}
              className={styles.swiperSlide}
            >
              <PartnerCard
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

export default PartnersGallery;
