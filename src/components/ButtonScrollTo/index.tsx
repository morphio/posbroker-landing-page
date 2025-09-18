'use client';

import AppButton, { Props as AppButtonProps } from '@/components/AppButton';

interface Props extends AppButtonProps {
  elementId: string;
}

export default function ButtonScrollTo(props: Props) {
  const { elementId, ...appButtonProps } = props;

  function scrollTo() {
    document.getElementById(elementId)?.scrollIntoView({
      behavior: 'smooth',
    });
  }

  return (
    <AppButton
      {...appButtonProps}
      onClick={scrollTo}
    />
  );
}
