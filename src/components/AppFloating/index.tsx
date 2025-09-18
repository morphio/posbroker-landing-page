import React from 'react';

import {
  flip,
  FloatingPortal,
  autoUpdate,
  useDismiss,
  useFloating,
  useInteractions,
  offset,
  size,
  Placement,
  useTransitionStyles,
} from '@floating-ui/react';

export interface AppFloatingProps extends React.PropsWithChildren {
  target: React.RefObject<HTMLElement>;
  opened: boolean;
  offset?: number;
  sameWidth?: boolean;
  placement?: Placement;
  fallbackPlacements?: Placement[];
  margin?: number;
  trigger?: React.RefObject<HTMLElement>;
  className?: string;
  root?: Nullable<HTMLElement | React.RefObject<Nullable<HTMLElement>>>;
  onClose: () => void;
}

const fallbackPlacements: Placement[] = [
  'bottom',
  'bottom-start',
  'bottom-end',
  'top',
  'top-start',
  'top-end',
];

const AppFloating: React.FC<AppFloatingProps> = (props) => {
  const middleware = [
    flip({
      fallbackPlacements: props.fallbackPlacements ?? fallbackPlacements,
    }),
    offset(props.offset),
    size({
      padding: props.margin,
      apply({ rects, elements, availableHeight }) {
        Object.assign(elements.floating.style, {
          width: props.sameWidth ? `${rects.reference.width}px` : undefined,
          maxHeight: `${availableHeight}px`,
          overflow: 'auto',
        });
      },
    }),
  ];

  const { refs, context, floatingStyles } = useFloating({
    open: props.opened,
    placement: props.placement ?? 'bottom',
    elements: {
      reference: props.target.current,
    },
    middleware,
    whileElementsMounted: autoUpdate,

    onOpenChange: (_, event) => {
      if (!event) {
        return;
      }

      if (props.trigger?.current.contains(event.target as HTMLElement)) {
        return;
      }

      props.onClose();
    },
  });

  const dismiss = useDismiss(context);

  const { getFloatingProps } = useInteractions([dismiss]);

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: 200,
  });

  if (!isMounted) {
    return null;
  }

  return (
    <FloatingPortal root={props.root}>
      <div
        ref={refs.setFloating}
        className={props.className}
        style={{
          ...floatingStyles,
          ...transitionStyles,
        }}
        {...getFloatingProps()}
      >
        {props.children}
      </div>
    </FloatingPortal>
  );
};

export default AppFloating;
