const GTMNonScript: React.FC = () => {
  const gtmContainerPublicId = process.env.NEXT_PUBLIC_GTM_CONTAINER_ID;
  const isGTM = !!gtmContainerPublicId;

  if (!isGTM) {
    return null;
  }

  return (
    <>
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmContainerPublicId}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        ></iframe>
      </noscript>
    </>
  );
};

export default GTMNonScript;
