/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import React from 'react';

import '@payloadcms/next/css';
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts';

import { APP_CONFIG } from '@/core/config';
import config from '@payload-config';

import { importMap } from './lp-admin/importMap.js';

import type { ServerFunctionClient } from 'payload';

interface Args {
  children: React.ReactNode;
}

const serverFunction: ServerFunctionClient = async function (args) {
  'use server';

  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
};

const Layout = async ({ children }: Args) => {
  return (
    <RootLayout
      config={config}
      importMap={importMap}
      serverFunction={serverFunction}
      htmlProps={{
        id: APP_CONFIG.RELEASE_DATE,
      }}
    >
      {children}
    </RootLayout>
  );
};

export default Layout;
