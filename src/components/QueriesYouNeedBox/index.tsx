import { useTranslations } from 'next-intl';

import WalletSvg from '@/assets/icons/wallet.svg';
import InfoBox, { InfoItem } from '@/components/InfoBox';

import styles from './styles.module.scss';

export default function QueriesYouNeedBox() {
  const t = useTranslations('organisations');
  const casesList: InfoItem[] = [
    {
      text: t('queriesSection.infoList.0'),
      icon: WalletSvg,
    },
    {
      text: t('queriesSection.infoList.1'),
      icon: WalletSvg,
    },
  ];

  return (
    <div className={styles.queriesYouNeedBox}>
      {casesList.map((item, index) => (
        <InfoBox
          className={styles.infoBox}
          key={index}
          icon={item.icon}
          text={item.text}
        />
      ))}
    </div>
  );
}
