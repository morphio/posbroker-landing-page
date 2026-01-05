export interface Partner {
  id: string | number;
  logo?: {
    url: string;
    alt?: string;
  } | number;
  name: string;
  category?: {
    name: string;
  } | number;
  label?: string;
  link?: string;
}

