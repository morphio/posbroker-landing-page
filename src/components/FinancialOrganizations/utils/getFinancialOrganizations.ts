import { draftMode } from 'next/headers';

import { getAppPayload } from '@/utils/getAppPayload';

interface GetFinancialOrganizationsProps {
  locale: 'ru' | 'uz';
}

const getFinancialOrganizations = async ({
  locale,
}: GetFinancialOrganizationsProps) => {
  const payload = await getAppPayload();
  const { isEnabled: isDraftMode } = await draftMode();

  try {
    const financialOrganizations = await payload.find({
      collection: 'financial-organizations',
      limit: 3,
      locale,
      draft: isDraftMode,
      overrideAccess: isDraftMode,
    });

    return financialOrganizations.docs;
  } catch (e) {
    console.error(e);

    return [];
  }
};

export default getFinancialOrganizations;
