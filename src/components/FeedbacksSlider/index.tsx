'use client';

import { useCallback, useRef } from 'react';

import 'swiper/css/effect-cards';
import { EffectCards, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperInstance } from 'swiper/types';

import ChevronDownSvg from '@/assets/icons/chevron-down.svg';
import FeedbackCard from '@/components/FeedbackCard';

import styles from './styles.module.scss';

export interface Feedback {
  text: string;
  name: string;
  occupation: string;
  color: string;
  image: string;
}

interface Props {
  feedbacks: Feedback[];
}

export default function FeedbacksSlider(props: Props) {
  const { feedbacks } = props;

  const swiperRef = useRef<SwiperInstance>(null);

  const handlePrev = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

  return (
    <Swiper
      effect={'cards'}
      spaceBetween={0}
      slidesPerView={'auto'}
      initialSlide={2}
      loop={true}
      centeredSlides={true}
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      pagination={{
        clickable: true,
        renderBullet: (i, className) => {
          return `<div class="${className}"></div>`;
        },
      }}
      modules={[EffectCards, Pagination, Navigation]}
      cardsEffect={{
        slideShadows: false,
        perSlideOffset: 4,
        perSlideRotate: 4,
      }}
      className={styles.feedbacksSlider}
    >
      {feedbacks.map((feedback, index) => (
        <SwiperSlide
          key={index}
          className={styles.swiperSlide}
        >
          <FeedbackCard
            className={styles.feedbackCard}
            image={feedback.image}
            feedback={feedback.text}
            backgroundColor={feedback.color}
            name={feedback.name}
            description={feedback.occupation}
          />
        </SwiperSlide>
      ))}
      <div className={styles.navigation}>
        <div
          className={styles.nav}
          onClick={handlePrev}
        >
          <ChevronDownSvg className={styles.navIcon} />
        </div>
        <div
          className={styles.nav}
          onClick={handleNext}
        >
          <ChevronDownSvg className={styles.navIcon} />
        </div>
      </div>
    </Swiper>
  );
}
