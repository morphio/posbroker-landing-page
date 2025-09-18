export function mergeRefs<T>(...refs: (React.Ref<T> | null)[]) {
  return (value: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref !== null) {
        ref.current = value;
      }
    });
  };
}
