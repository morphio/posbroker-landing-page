import { forwardRef } from 'react';

import { useMask } from '@react-input/mask';

import AppInput, { Props as AppInputProps } from '@/components/AppInput';
import { mergeRefs } from '@/utils/mergeRefs';

const AppPhoneInput = forwardRef<HTMLInputElement, AppInputProps>(
  (props, ref) => {
    const inputRef = useMask({
      mask: '__ ___-__-__',
      replacement: { _: /\d/ },
    });

    return (
      <AppInput
        {...props}
        ref={mergeRefs(inputRef, ref)}
      />
    );
  },
);

// Just to prevent ESLint error
AppPhoneInput.displayName = 'AppPhoneInput';

export default AppPhoneInput;
