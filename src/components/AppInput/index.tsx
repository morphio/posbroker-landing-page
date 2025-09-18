import { forwardRef } from 'react';

import styles from './styles.module.scss';

export interface Props {
  className?: string;
  placeholder?: string;
  value: string;
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  name: string;
  prefix?: string | React.ReactNode;
  suffix?: string | React.ReactNode;
  error?: string;
  disabled?: boolean;
  editable?: boolean;
}

const AppInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    placeholder,
    className,
    value,
    onInput,
    onFocus,
    onBlur,
    onClick,
    name,
    prefix,
    suffix,
    error,
    disabled = false,
    editable = true,
  } = props;

  return (
    <div
      className={[
        styles.appInput,
        className,
        error && styles.error,
        disabled && styles.disabled,
        !editable && styles.notEditable,
      ].join(' ')}
      onClick={onClick}
    >
      <div className={styles.wrapper}>
        {prefix && <span className={styles.prefix}>{prefix}</span>}
        <input
          ref={ref}
          name={name}
          className={styles.input}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onInput={onInput}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </div>
      {error && <div className={styles.errorText}>{error}</div>}
    </div>
  );
});

// Just to prevent ESLint error
AppInput.displayName = 'AppInput';

export default AppInput;
