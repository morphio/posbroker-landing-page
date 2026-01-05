export interface FinancialOrganization {
  id: string | number;
  name: string;
  logo?: {
    url: string;
    alt?: string;
  } | number;
  link?: string;
  label?: string;
}

