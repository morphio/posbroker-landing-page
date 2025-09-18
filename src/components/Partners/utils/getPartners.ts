import { draftMode } from 'next/headers';

import { getAppPayload } from '@/utils/getAppPayload';

interface GetPartnersProps {
  locale: 'ru' | 'uz';
}

const getPartners = async ({ locale }: GetPartnersProps) => {
  const payload = await getAppPayload();
  const { isEnabled: isDraftMode } = await draftMode();

  try {
    const partners = await payload.find({
      collection: 'partners',
      limit: 16,
      locale,
      draft: isDraftMode,
      overrideAccess: isDraftMode,
    });

    return partners.docs;
  } catch (e) {
    console.error(e);

    return [];
  }
};

export default getPartners;
