interface GetFinancialOrganizationsProps {
  locale: 'ru' | 'uz';
}

const getFinancialOrganizations = async ({
  locale,
}: GetFinancialOrganizationsProps) => {
  // Payload CMS removed - returning empty array
  return [];
};

export default getFinancialOrganizations;
