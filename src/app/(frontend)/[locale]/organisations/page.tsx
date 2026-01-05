import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import CubeSvg from '@/assets/icons/cube.svg';
import DataflowSvg from '@/assets/icons/dataflow.svg';
import FaceWinkSvg from '@/assets/icons/face-wink.svg';
import AppSection from '@/components/AppSection';
import ButtonScrollTo from '@/components/ButtonScrollTo';
import { CircleInfoBoxData } from '@/components/CircleInfoBox';
import DocsSection from '@/components/DocsSection';
import FinancialOrganizations from '@/components/FinancialOrganizations';
import HeroBanner from '@/components/HeroBanner';
import OrderFlow from '@/components/OrderFlow';
import OrganisationQueryForm from '@/components/OrganisationQueryForm';
import Partners from '@/components/Partners';
import QueriesYouNeedBox from '@/components/QueriesYouNeedBox';
import UsefulCasesBox from '@/components/UsefulCasesBox';

import styles from './page.module.scss';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('organisations');

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `https://foydabroker.uz/${locale}/organisations`,
    },
  };
}

export async function generateStaticParams() {
  return [{ locale: 'ru' }, { locale: 'uz' }];
}


export default function Organisations() {
  const locale = useLocale() as 'ru' | 'uz';
  const t = useTranslations('organisations');

  const orderFlowItems: CircleInfoBoxData[] = [
    {
      title: t('integrationSection.orderFlow.0'),
      image: CubeSvg,
    },
    {
      title: t('integrationSection.orderFlow.1'),
      image: DataflowSvg,
    },
    {
      title: t('integrationSection.orderFlow.2'),
      image: FaceWinkSvg,
    },
  ];

  return (
    <>
      <AppSection transparent>
        <HeroBanner
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
          underTitle={t('heroBanner.underTitle')}
          leftBox={
            <div className={styles.heroBtnBox}>
              <ButtonScrollTo
                className={styles.button}
                label={t('becomePartner')}
                elementId="formSection"
              />
              <span className={styles.btnHint}>
                {t('heroBanner.buttonHint')}
              </span>
            </div>
          }
          rightBox={
            <Image
              className={styles.heroImage}
              src={'/images/for-banks.webp'}
              alt={'Finances image'}
              width={646}
              height={400}
            />
          }
        />
      </AppSection>
      <AppSection title={t('integrationSection.title')}>
        <OrderFlow items={orderFlowItems} />
        <ButtonScrollTo
          className={styles.button}
          label={t('becomePartner')}
          elementId={'formSection'}
        />
      </AppSection>
      <Partners locale={locale} />
      <FinancialOrganizations locale={locale} />
      <AppSection>
        <UsefulCasesBox />
        <ButtonScrollTo
          className={styles.button}
          label={t('becomePartner')}
          elementId={'formSection'}
        />
      </AppSection>
      <AppSection title={t('queriesSection.title')}>
        <QueriesYouNeedBox />
        <ButtonScrollTo
          className={styles.button}
          label={t('becomePartner')}
          elementId={'formSection'}
        />
      </AppSection>
      <AppSection title={t('docs.title')}>
        <DocsSection />
      </AppSection>
      <AppSection
        id="formSection"
        transparent={true}
      >
        <OrganisationQueryForm />
      </AppSection>
    </>
  );
}
