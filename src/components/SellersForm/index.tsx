'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';
import * as yup from 'yup';

import AppButton from '@/components/AppButton';
import AppForm from '@/components/AppForm';
import AppInput from '@/components/AppInput';
import AppPhoneInput from '@/components/AppPhoneInput';
import SendFormMessage from '@/components/SendFormMessage';
import { APP_CONFIG } from '@/core/config';
import useFieldsValidator from '@/hooks/fieldsValidator';
import { formDataToObject } from '@/utils';
import httpQuery, { HttpQueryError } from '@/utils/httpQuery';

import styles from './styles.module.scss';

interface FormState {
  name: string;
  company: string;
  phone: string;
}

const phoneRegExp = /^(\d{9})$/;

export default function SellersForm() {
  const t = useTranslations('sellers');
  const [isSend, setIsSend] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isInProcess, setIsInProcess] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormState>({
    name: '',
    company: '',
    phone: '',
  });

  const { errors, validateErrors, clearError } = useFieldsValidator<FormState>({
    name: {
      value: formValues.name,
      schema: yup.string().required(t('form.errors.name')),
    },
    company: {
      value: formValues.company,
      schema: yup.string().required(t('form.errors.company')),
    },
    phone: {
      value: formValues.phone.replace(/\D/g, ''),
      schema: yup
        .string()
        .matches(phoneRegExp, t('form.errors.wrongPhone'))
        .required(t('form.errors.phone')),
    },
  });

  function onInputHandler(fieldName: keyof FormState, value: string): void {
    clearError(fieldName);

    setFormValues({
      ...formValues,
      [fieldName]: value,
    });
  }

  async function sendForm(): Promise<void> {
    try {
      await validateErrors();

      const phone = formValues.phone.replace(/\D/g, '');

      setIsInProcess(true);

      const formData = new FormData();

      formData.append('sheetName', 'Sellers');

      Object.entries(formValues).forEach(([key, value]: [string, string]) => {
        if (key === 'phone') {
          formData.append(key, `+998${phone}`);
        } else {
          formData.append(key, value);
        }
      });

      await httpQuery(`${APP_CONFIG.API_URL}/landing/forms/sellers/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToObject(formData)),
      });

      setIsSend(true);
    } catch (e) {
      if (e instanceof HttpQueryError) {
        setIsError(true);
      }
    }

    setIsInProcess(false);
  }

  return (
    <AppForm title={t('form.title')}>
      {isSend || isError ? (
        <SendFormMessage error={isError} />
      ) : (
        <>
          <AppInput
            className={styles.input}
            placeholder={t('form.name')}
            value={formValues.name}
            onInput={(e) => onInputHandler('name', e.target.value)}
            name="name"
            disabled={isInProcess}
            error={errors.name}
          />
          <AppInput
            className={styles.input}
            placeholder={t('form.company')}
            value={formValues.company}
            onInput={(e) => onInputHandler('company', e.currentTarget.value)}
            name="company"
            disabled={isInProcess}
            error={errors.company}
          />
          <AppPhoneInput
            className={styles.input}
            placeholder={'XX XXX-XX-XX'}
            value={formValues.phone}
            onInput={(e) => onInputHandler('phone', e.currentTarget.value)}
            name="phone"
            prefix={'+998'}
            disabled={isInProcess}
            error={errors.phone}
          />
          <AppButton
            className={styles.button}
            label={t('form.send')}
            loading={isInProcess}
            onClick={sendForm}
          />
          <span className={styles.text}>
            {t('form.hint1')}{' '}
            <a
              className={styles.link}
              href={t('form.privacyLink')}
              target="_blank"
              rel="noreferrer"
            >
              {t('form.hint2')}
            </a>
            .
          </span>
        </>
      )}
    </AppForm>
  );
}
