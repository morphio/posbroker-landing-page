import { useState } from 'react';

import * as yup from 'yup';
import { ValidationError } from 'yup';

interface Field<T> {
  value: T;
  schema: yup.StringSchema;
}

type Fields<T> = {
  [key in keyof T]: Field<T[key]>;
};

const useFieldsValidator = <T extends Record<keyof T, string>>(
  fields: Fields<T>,
) => {
  const initialErrors = Object.fromEntries(
    Object.keys(fields).map((key) => [key, '']),
  ) as Record<keyof T, string>;

  const [errors, setError] = useState<Record<keyof T, string>>(initialErrors);

  const setFieldError = (fieldName: keyof T, message: string): void => {
    setError({
      ...errors,
      [fieldName]: message,
    });
  };

  const validateErrors = async (overrideFields?: Partial<Fields<T>>) => {
    const clonedFields = {
      ...fields,
    };

    if (overrideFields) {
      Object.entries(overrideFields).forEach(([key, value]) => {
        if (value !== undefined) {
          clonedFields[key as keyof T].value = (
            value as Field<T[keyof T]>
          ).value;
        }
      });
    }

    for (const [fieldName, field] of Object.entries(clonedFields) as [
      keyof T,
      Field<T[keyof T]>,
    ][]) {
      try {
        await field.schema.validate(field.value);
      } catch (e) {
        if (e instanceof ValidationError) {
          setFieldError(fieldName, e.message);
          throw new ValidationError(e);
        }
      }
    }
  };

  const clearError = (field: keyof T) => {
    setError({
      ...errors,
      [field]: '',
    });
  };

  return {
    errors,
    setFieldError,
    validateErrors,
    clearError,
  };
};

export default useFieldsValidator;
