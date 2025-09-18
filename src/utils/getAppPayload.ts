import { getPayload } from 'payload';

import config from '@payload-config';

export const getAppPayload = () => {
  return getPayload({ config });
};
