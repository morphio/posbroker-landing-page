import styles from './styles.module.scss';

interface Props {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function AppForm(props: Props) {
  const { title, children, className } = props;

  return (
    <div className={className}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <form className={styles.form}>{children}</form>
    </div>
  );
}
