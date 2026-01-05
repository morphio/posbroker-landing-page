import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import BarLineChartSvg from '@/assets/icons/bar-line-chart.svg';
import CreditCardCheckSvg from '@/assets/icons/credit-card-check.svg';
import CubeSvg from '@/assets/icons/cube.svg';
import DataflowSvg from '@/assets/icons/dataflow.svg';
import FaceWinkSvg from '@/assets/icons/face-wink.svg';
import HeartSquareSvg from '@/assets/icons/heart-square.svg';
import RocketSvg from '@/assets/icons/rocket.svg';
import AppSection from '@/components/AppSection';
import BigQuoteBox from '@/components/BigQuoteBox';
import ButtonScrollTo from '@/components/ButtonScrollTo';
import { CircleInfoBoxData } from '@/components/CircleInfoBox';
import FeedbacksSlider, { Feedback } from '@/components/FeedbacksSlider';
import FinancialOrganizations from '@/components/FinancialOrganizations';
import HeroBanner, { InfoItem } from '@/components/HeroBanner';
import OrderFlow from '@/components/OrderFlow';
import Partners from '@/components/Partners';
import SellersForm from '@/components/SellersForm';
import { shuffleArray } from '@/utils';

import styles from './page.module.scss';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('sellers');

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `https://foydabroker.uz/${locale}/sellers`,
    },
  };
}

export async function generateStaticParams() {
  return [{ locale: 'ru' }, { locale: 'uz' }];
}


export default function Sellers() {
  const locale = useLocale() as 'uz' | 'ru';
  const t = useTranslations('sellers');

  const infoItems: InfoItem[] = Array.from({ length: 3 }, (_, i) => ({
    title: t(`heroBanner.infoList.${i}.title`),
    value: t(`heroBanner.infoList.${i}.text`),
  }));

  const orderFlowItems: CircleInfoBoxData[] = [
    {
      title: t(`howDoesItWorkSection.orderFlow.0`),
      image: CubeSvg,
    },
    {
      title: t(`howDoesItWorkSection.orderFlow.1`),
      image: DataflowSvg,
    },
    {
      title: t(`howDoesItWorkSection.orderFlow.2`),
      image: FaceWinkSvg,
    },
    {
      title: t(`howDoesItWorkSection.orderFlow.3`),
      image: CreditCardCheckSvg,
    },
  ];

  const whyDoYouNeedItList: CircleInfoBoxData[] = [
    {
      title: t(`whyIsItNeededSection.orderFlow.0`),
      image: RocketSvg,
    },
    {
      title: t(`whyIsItNeededSection.orderFlow.1`),
      image: BarLineChartSvg,
    },
    {
      title: t(`whyIsItNeededSection.orderFlow.2`),
      image: HeartSquareSvg,
    },
  ];

  const feedbacks: Feedback[] = [
    {
      text: t('slider.0.text'),
      name: t('slider.0.name'),
      occupation: t('slider.0.info'),
      color: '#FFBF80',
      image: '/images/sellers/review_0.webp',
    },
    {
      text: t('slider.1.text'),
      name: t('slider.1.name'),
      occupation: t('slider.1.info'),
      color: '#B0D7A0',
      image: '/images/sellers/review_1.webp',
    },
    {
      text: t('slider.2.text'),
      name: t('slider.2.name'),
      occupation: t('slider.2.info'),
      color: '#FFC24A',
      image: '/images/sellers/review_2.webp',
    },
    {
      text: t('slider.3.text'),
      name: t('slider.3.name'),
      occupation: t('slider.3.info'),
      color: '#53B1FD',
      image: '/images/sellers/review_3.webp',
    },
    {
      text: t('slider.4.text'),
      name: t('slider.4.name'),
      occupation: t('slider.4.info'),
      color: '#3FBFD6',
      image: '/images/sellers/review_4.webp',
    },
  ];

  return (
    <>
      <AppSection transparent>
        <HeroBanner
          title={t(`heroBanner.title`)}
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
          underTitle={t(`heroBanner.underTitle`)}
          infoItems={infoItems}
          leftBox={
            <div className={styles.heroBtnBox}>
              <ButtonScrollTo
                className={styles.button}
                label={t(`sendRequest`)}
                elementId="formSection"
              />
              <span className={styles.btnHint}>
                {t(`heroBanner.buttonHing`)}
              </span>
            </div>
          }
          rightBox={<FeedbacksSlider feedbacks={shuffleArray(feedbacks)} />}
        />
      </AppSection>
      <AppSection title={t('howDoesItWorkSection.title')}>
        <OrderFlow
          items={orderFlowItems}
          showArrow={true}
        />
        <div className={styles.row}>
          <ButtonScrollTo
            className={styles.button}
            label={t('sendRequest')}
            elementId="formSection"
          />
        </div>
      </AppSection>
      <Partners locale={locale} />
      <FinancialOrganizations locale={locale} />
      <AppSection title={t('whyIsItNeededSection.title')}>
        <OrderFlow items={whyDoYouNeedItList} />

        <div className={styles.bgBox}>
          <Image
            className={styles.screenshot}
            src={'/images/screenshot.jpg'}
            width={1080}
            height={467}
            alt={'Screenshot'}
          />
        </div>

        <ButtonScrollTo
          className={styles.button}
          label={t('sendRequest')}
          elementId="formSection"
        />
        <BigQuoteBox
          text={t('bigQuoteBox.text')}
          name={t('bigQuoteBox.name')}
          designation={t('bigQuoteBox.description')}
          imgUrl={'/images/uz-man.png'}
        />
      </AppSection>
      <AppSection
        id="formSection"
        transparent
      >
        <SellersForm />
      </AppSection>
    </>
  );
}
