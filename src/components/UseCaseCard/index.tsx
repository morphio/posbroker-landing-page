import styles from './styles.module.scss';

interface Props {
  icon: React.ElementType;
  title: string;
  description: string;
  className?: string;
}

export default function UseCaseCard(props: Props) {
  const { title, description, className } = props;

  return (
    <div className={[styles.useCaseCard, className && className].join(' ')}>
      <props.icon className={styles.icon} />
      <h3 className={styles.title}>{title}</h3>
      <span className={styles.description}>{description}</span>
    </div>
  );
}
