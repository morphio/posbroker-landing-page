import React from 'react';

import { getTranslations } from 'next-intl/server';

import AppSection from '../AppSection';

import PartnersGallery from './components/PartnersGallery';
import getPartners from './utils/getPartners';

interface PartnersProps {
  locale: 'ru' | 'uz';
}

const Partners: React.FC<PartnersProps> = async ({ locale }) => {
  const t = await getTranslations('partnersSection');

  const partners = await getPartners({ locale });

  if (!partners.length) {
    return null;
  }

  return (
    <AppSection title={t('title')}>
      <PartnersGallery partners={partners} />
    </AppSection>
  );
};

export default Partners;
