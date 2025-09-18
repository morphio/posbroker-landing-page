/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client';

import React from 'react';

const GTMScript: React.FC = () => {
  const gtmContainerPublicId = process.env.NEXT_PUBLIC_GTM_CONTAINER_ID;
  const isGTM = !!gtmContainerPublicId;

  React.useEffect(() => {
    if (!isGTM) {
      return;
    }

    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js',
    });
  }, [isGTM]);

  if (!isGTM) {
    return null;
  }

  return (
    <>
      {/* Google Tag Manager script */}
      <script
        id="gtm-script"
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${gtmContainerPublicId}')`,
        }}
      />
    </>
  );
};

export default GTMScript;
