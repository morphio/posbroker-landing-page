import React, { JSX, useEffect } from 'react';

import clsx from 'clsx';

import { useIsDesktop } from '@/hooks/useIsDesktop';
import { checkIsElementInteractive } from '@/utils/checkIsElementInteractive';

import AppFloating from '../AppFloating';

import styles from './styles.module.scss';

export interface UiTooltipProps {
  text: string;
  size: 's' | 'm';
  appearance: 'default' | 'positive';
  disabled?: boolean;
  fullWidth?: boolean;
  children: React.ReactElement<
    Partial<JSX.IntrinsicElements[keyof JSX.IntrinsicElements]>
  >;
}

const AppTooltip: React.FC<UiTooltipProps> = ({
  children,
  text,
  size,
  appearance,
  disabled,
  fullWidth,
}) => {
  const [opened, setOpened] = React.useState(false);
  const targetRef = React.useRef<HTMLElement>(null);
  const isDesktop = useIsDesktop();
  const [documentBody, setDocumentBody] = React.useState<HTMLElement | null>(
    null,
  );

  useEffect(() => {
    setDocumentBody(document.body);
  }, []);

  const handleOpen = () => {
    if (disabled) {
      return;
    }

    setOpened(true);
  };

  const childrenProps = children.props as {
    onClick?: (event: React.MouseEvent) => void;
  };

  const isTargetInteractive = checkIsElementInteractive(targetRef);

  return (
    <>
      {React.cloneElement(children, {
        tabIndex: !isTargetInteractive || disabled ? -1 : 0,
        ref: targetRef,
        onClick: (event: React.MouseEvent) => {
          handleOpen();
          childrenProps.onClick?.(event);
        },
        onMouseEnter: handleOpen,
        onMouseLeave: () => setOpened(false),
        onFocus: handleOpen,
        onBlur: () => setOpened(false),
      })}

      {documentBody && (
        <AppFloating
          key={appearance}
          placement={isDesktop ? 'bottom' : 'top'}
          opened={opened}
          offset={5}
          target={targetRef as React.RefObject<HTMLElement>}
          root={documentBody}
          fallbackPlacements={
            isDesktop
              ? ['bottom-start', 'bottom-end', 'top', 'top-start', 'top-end']
              : ['top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end']
          }
          onClose={() => setOpened(false)}
        >
          <div
            className={clsx(
              styles.tooltip,
              styles[size],
              styles[appearance],
              fullWidth && styles.fullWidth,
            )}
          >
            <span className={clsx(styles.label, styles[size])}>{text}</span>
          </div>
        </AppFloating>
      )}
    </>
  );
};

export default AppTooltip;
