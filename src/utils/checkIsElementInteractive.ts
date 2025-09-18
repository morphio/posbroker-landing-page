import invariant from 'tiny-invariant';

export const checkIsElementInteractive = (
  targetRef: React.RefObject<HTMLElement | null>,
) => {
  if (!targetRef.current) {
    return false;
  }

  invariant(
    targetRef.current instanceof HTMLElement,
    '[invariant]: Trigger must be an element',
  );

  return targetRef.current.tabIndex > -1;
};
