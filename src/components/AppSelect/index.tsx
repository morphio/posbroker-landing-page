import { forwardRef } from 'react';

import styles from './styles.module.scss';

export interface AppSelectOption {
  label: string;
  value: string | number;
}

export interface Props {
  className?: string;
  placeholder?: string;
  value: string;
  options: AppSelectOption[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  name: string;
  prefix?: string | React.ReactNode;
  suffix?: string | React.ReactNode;
  error?: string;
  disabled?: boolean;
  editable?: boolean;
}

const AppSelect = forwardRef<HTMLSelectElement, Props>((props, ref) => {
  const {
    className,
    placeholder = '',
    value = '',
    options,
    onChange = () => null,
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
        styles.appSelect,
        className,
        error && styles.error,
        disabled && styles.disabled,
        !editable && styles.notEditable,
      ].join(' ')}
      onClick={onClick}
    >
      <div className={styles.wrapper}>
        {prefix && <span className={styles.prefix}>{prefix}</span>}
        <select
          ref={ref}
          name={name}
          className={[styles.select, !value.length && styles.withLabel].join(
            ' ',
          )}
          disabled={disabled}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          <option
            className={styles.option}
            value=""
            disabled
          >
            {placeholder}
          </option>
          {options.map((option) => (
            <option
              className={styles.option}
              value={option.value}
              key={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </div>
      {error && <div className={styles.errorText}>{error}</div>}
    </div>
  );
});

// Just to prevent ESLint error
AppSelect.displayName = 'AppSelect';

export default AppSelect;
