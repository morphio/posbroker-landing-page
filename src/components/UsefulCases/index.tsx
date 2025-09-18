import { useTranslations } from 'next-intl';

import BarChartCircle from '@/assets/icons/bar-chart-circle.svg';
import ClockCheckSvg from '@/assets/icons/clock-check.svg';
import CoinsSVg from '@/assets/icons/coins.svg';
import DatabaseSvg from '@/assets/icons/database.svg';
import TerminalBrowserSvg from '@/assets/icons/terminal-browser.svg';
import InfoBox, { InfoItem } from '@/components/InfoBox';

import styles from './styles.module.scss';

export default function UsefulCases() {
  const t = useTranslations('organisations');
  const cases: InfoItem[] = [
    {
      text: t('usefulSection.infoList.0'),
      icon: CoinsSVg,
    },
    {
      text: t('usefulSection.infoList.1'),
      icon: BarChartCircle,
    },
    {
      text: t('usefulSection.infoList.2'),
      icon: ClockCheckSvg,
    },
    {
      text: t('usefulSection.infoList.3'),
      icon: TerminalBrowserSvg,
    },
    {
      text: t('usefulSection.infoList.4'),
      icon: DatabaseSvg,
    },
  ];

  return (
    <div className={styles.usefulCases}>
      <div className={styles.usefulCases}>
        <div className={styles.row}>
          {cases.slice(0, 3).map((item, index) => (
            <InfoBox
              className={styles.infoBox}
              key={index}
              icon={item.icon}
              text={item.text}
            />
          ))}
        </div>
        <div className={styles.row}>
          {cases.slice(3).map((item, index) => (
            <InfoBox
              className={styles.infoBox}
              key={index + 3}
              icon={item.icon}
              text={item.text}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
