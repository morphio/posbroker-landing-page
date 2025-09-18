import styles from './styles.module.scss';

export interface InfoItem {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  text: string;
}

interface Props extends InfoItem {
  className?: string;
}

export default function InfoBox(props: Props) {
  const { icon: IconSvg, text, className } = props;

  return (
    <div className={[styles.infoBox, className].join(' ')}>
      <IconSvg className={styles.icon} />
      <span className={styles.text}>{text}</span>
    </div>
  );
}
