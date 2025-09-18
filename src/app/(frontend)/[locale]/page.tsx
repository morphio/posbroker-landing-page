import { useLocale, useTranslations } from 'next-intl';

import FileCheckSvg from '@/assets/icons/file-check.svg';
import PackageCheckSvg from '@/assets/icons/package-check.svg';
import PackageSvg from '@/assets/icons/package.svg';
import AppFAQ from '@/components/AppFAQ';
import AppSection from '@/components/AppSection';
import ButtonScrollTo from '@/components/ButtonScrollTo';
import { CircleInfoBoxData } from '@/components/CircleInfoBox';
import FeedbacksSlider, { Feedback } from '@/components/FeedbacksSlider';
import FinancialOrganizations from '@/components/FinancialOrganizations';
import HeroBanner, { InfoItem } from '@/components/HeroBanner';
import OrderFlow from '@/components/OrderFlow';
import Partners from '@/components/Partners';
import RatingNumber from '@/components/RatingNumber';
import RatingStars from '@/components/RatingStars';
import SliderWithRating from '@/components/SliderWithRating';
import UseCases from '@/components/UseCases';
import { shuffleArray } from '@/utils';

import styles from './page.module.scss';

export default function Home() {
  const locale = useLocale() as 'uz' | 'ru';
  const t = useTranslations('buyers');

  const infoItems: InfoItem[] = Array.from({ length: 3 }, (_, i) => ({
    title: t(`heroBanner.infoList.${i}.title`),
    value: t(`heroBanner.infoList.${i}.text`),
  }));

  const orderFlowItems: CircleInfoBoxData[] = [
    {
      title: t('easySection.orderFlow.0'),
      image: PackageSvg,
    },
    {
      title: t('easySection.orderFlow.1'),
      image: FileCheckSvg,
    },
    {
      title: t('easySection.orderFlow.2'),
      image: PackageCheckSvg,
    },
  ];

  const feedbacks: Feedback[] = [
    {
      text: t('slider.1.text'),
      name: t('slider.1.name'),
      occupation: t('slider.1.info'),
      color: '#FFC24A',
      image: '/images/Pic_2.webp',
    },
    {
      text: t('slider.2.text'),
      name: t('slider.2.name'),
      occupation: t('slider.2.info'),
      color: '#FFBF80',
      image: '/images/Pic_3.webp',
    },
    {
      text: t('slider.0.text'),
      name: t('slider.0.name'),
      occupation: t('slider.0.info'),
      color: '#FF8589',
      image: '/images/Pic_1.webp',
    },
    {
      text: t('slider.3.text'),
      name: t('slider.3.name'),
      occupation: t('slider.3.info'),
      color: '#5ACD9D',
      image: '/images/Pic_4.webp',
    },
    {
      text: t('slider.4.text'),
      name: t('slider.4.name'),
      occupation: t('slider.4.info'),
      color: '#53B1FD',
      image: '/images/Pic_5.webp',
    },
  ];

  return (
    <>
      <AppSection
        className={styles.heeroSection}
        transparent
      >
        <HeroBanner
          underTitle={t('heroBanner.underTitle')}
          title={t('heroBanner.title')}
          subtitle={
            <span
              className={styles.subtitle}
              dangerouslySetInnerHTML={{
                __html: t.markup('heroBanner.subtitle', {
                  important: (chunks) => `<b>${chunks}</b>`,
                }),
              }}
            />
          }
          infoItems={infoItems}
          leftBox={
            <>
              <div className={styles.ratingBox}>
                <RatingNumber
                  value={4.9}
                  max={5}
                />
                <RatingStars
                  className={styles.stars}
                  starClassName={styles.star}
                  value={5}
                  max={5}
                />
              </div>
              <ButtonScrollTo
                className={styles.button}
                label={t('heroBanner.howDoesItWork')}
                elementId={'howDoesItWorkSection'}
              />
            </>
          }
          rightBox={<FeedbacksSlider feedbacks={shuffleArray(feedbacks)} />}
        />
      </AppSection>
      <AppSection
        id="howDoesItWorkSection"
        title={t('easySection.title')}
      >
        <OrderFlow
          items={orderFlowItems}
          showArrow={true}
        />
      </AppSection>
      <Partners locale={locale} />
      <FinancialOrganizations locale={locale} />
      <AppSection title={t('whenSection.title')}>
        <div className={styles.whenSection}>
          <UseCases />
          <SliderWithRating />
        </div>
      </AppSection>
      <AppSection title={t('faqSection.title')}>
        <AppFAQ />
      </AppSection>
    </>
  );
}
