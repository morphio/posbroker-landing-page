'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

const ExitPreviewButton: React.FC = () => {
  const router = useRouter();

  const handleExitPreview = () => {
    fetch('/exit-preview')
      .then(() => {
        router.push('/');
        router.refresh();
      })
      .catch((error: unknown) => {
        console.error('Error exiting preview:', error);
      });
  };

  return <button onClick={handleExitPreview}>Exit preview mode</button>;
};

export default ExitPreviewButton;
