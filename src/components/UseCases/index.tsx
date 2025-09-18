import { useTranslations } from 'next-intl';

import CoinsHandSvg from '@/assets/icons/coins-hand.svg';
import FlashSvg from '@/assets/icons/flash.svg';
import PackageSvg from '@/assets/icons/package.svg';
import WalletSvg from '@/assets/icons/wallet.svg';
import UseCaseCard from '@/components/UseCaseCard';

import styles from './styles.module.scss';

interface UseCase {
  icon: React.ElementType;
  title: string;
  description: string;
}

export default function UseCases() {
  const t = useTranslations('buyers');

  const useCases: UseCase[] = [
    {
      title: t('whenSection.infoList.0.title'),
      description: t('whenSection.infoList.0.description'),
      icon: WalletSvg,
    },
    {
      title: t('whenSection.infoList.1.title'),
      description: t('whenSection.infoList.1.description'),
      icon: FlashSvg,
    },
    {
      title: t('whenSection.infoList.2.title'),
      description: t('whenSection.infoList.2.description'),
      icon: PackageSvg,
    },
    {
      title: t('whenSection.infoList.3.title'),
      description: t('whenSection.infoList.3.description'),
      icon: CoinsHandSvg,
    },
  ];

  return (
    <div className={styles.useCases}>
      {useCases.map((useCase, index) => (
        <UseCaseCard
          key={index}
          className={styles.useCase}
          title={useCase.title}
          description={useCase.description}
          icon={useCase.icon}
        />
      ))}
    </div>
  );
}
