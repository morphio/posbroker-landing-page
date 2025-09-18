import { draftMode } from 'next/headers';

import ExitPreviewButton from './ExitButton';

import styles from './style.module.scss';

const AdminBar: React.FC = async () => {
  const { isEnabled: isDraftMode } = await draftMode();

  if (!isDraftMode) {
    return null;
  }

  return (
    <div className={styles.adminBarLayout}>
      <div className={styles.adminBar}>
        <ExitPreviewButton />
      </div>
    </div>
  );
};

export default AdminBar;
