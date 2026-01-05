interface GetPartnersProps {
  locale: 'ru' | 'uz';
}

const getPartners = async ({ locale }: GetPartnersProps) => {
  // Payload CMS removed - returning empty array
  return [];
};

export default getPartners;
