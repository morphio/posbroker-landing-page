import { useEffect, useRef, useState } from 'react';

import ChevronSvg from '@/assets/icons/chevron-down.svg';
import AppSelect from '@/components/AppSelect';
import useClickOutside from '@/hooks/useClickOutside';

import styles from './styles.module.scss';

export interface UiSelectOption {
  label: string;
  value: string | number;
  key?: string | number;
}

export interface Props {
  className?: string;
  placeholder?: string;
  value: string;
  options: UiSelectOption[];
  onChange?: (value: string | number) => void;
  name: string;
  prefix?: string | React.ReactNode;
  error?: string;
  disabled?: boolean;
}

export default function AppDropdown(props: Props) {
  const {
    className,
    placeholder,
    value,
    onChange,
    name,
    prefix,
    error,
    disabled,
    options,
  } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dropdownListRef = useRef<HTMLUListElement | null>(null);

  const handleSelect = (optionValue: string | number) => {
    if (onChange) {
      onChange(optionValue);
    }

    setIsOpen(false);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLUListElement>) => {
    event.preventDefault();
  };

  const toggleDropdown = (state: boolean): void => {
    if (state && disabled) {
      return;
    }

    setIsOpen(state);
  };

  useClickOutside(dropdownRef, (): void => {
    setIsOpen(false);
  });

  useEffect(() => {
    if (isOpen) {
      const dropdown = dropdownListRef.current;

      if (dropdown) {
        const { bottom } = dropdown.getBoundingClientRect();

        if (bottom > window.innerHeight) {
          setDropdownStyle({
            maxHeight: `${window.innerHeight - dropdown.getBoundingClientRect().top - 20}px`,
            overflowY: 'auto',
          });
        } else {
          setDropdownStyle({});
        }
      }
    }
  }, [isOpen]);

  return (
    <div
      className={[styles.appDropdown, isOpen && styles.open, className].join(
        ' ',
      )}
      ref={dropdownRef}
    >
      <AppSelect
        value={value}
        options={options}
        name={name}
        placeholder={placeholder}
        onFocus={() => toggleDropdown(true)}
        onBlur={() => toggleDropdown(false)}
        onClick={() => toggleDropdown(!isOpen)}
        prefix={prefix}
        suffix={
          <ChevronSvg
            className={styles.icon}
            width={24}
            height={24}
          />
        }
        error={error}
        disabled={disabled}
        editable={false}
      />
      {isOpen && (
        <ul
          className={styles.list}
          style={dropdownStyle}
          onMouseDown={handleMouseDown}
          ref={dropdownListRef}
        >
          {options.map((option) => (
            <li
              key={option.key ?? option.value}
              className={[
                styles.item,
                value === option.value ? styles.active : '',
              ].join(' ')}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
