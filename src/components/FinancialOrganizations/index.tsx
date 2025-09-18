import React from 'react';

import { getTranslations } from 'next-intl/server';

import AppSection from '../AppSection';

import FinancialOrganizationsGallery from './components/FinancialOrganizationsGallery';
import getFinancialOrganizations from './utils/getFinancialOrganizations';

interface FinancialOrganizationsProps {
  locale: 'ru' | 'uz';
}

const FinancialOrganizations: React.FC<FinancialOrganizationsProps> = async ({
  locale,
}) => {
  const t = await getTranslations('financialOrganizationsSection');

  const financialOrganizations = await getFinancialOrganizations({ locale });

  if (!financialOrganizations.length) {
    return null;
  }

  return (
    <AppSection title={t('title')}>
      <FinancialOrganizationsGallery
        financialOrganizations={financialOrganizations}
      />
    </AppSection>
  );
};

export default FinancialOrganizations;
