'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';
import * as yup from 'yup';

import AppButton from '@/components/AppButton';
import AppDropdown from '@/components/AppDropdown';
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
  companyType: string;
  companyName: string;
  phone: string;
}

const phoneRegExp = /^(\d{9})$/;

export default function OrganisationQueryForm() {
  const t = useTranslations('organisations');
  const [isSend, setIsSend] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isInProcess, setIsInProcess] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormState>({
    name: '',
    companyType: '',
    companyName: '',
    phone: '',
  });
  const { errors, validateErrors, clearError } = useFieldsValidator<FormState>({
    name: {
      value: formValues.name,
      schema: yup.string().required(t('form.errors.name')),
    },
    companyType: {
      value: formValues.companyType,
      schema: yup.string().required(t('form.errors.companyType')),
    },
    companyName: {
      value: formValues.companyName,
      schema: yup.string().required(t('form.errors.companyName')),
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

  function choseOrganisationType(value: string | number): void {
    setFormValues({
      ...formValues,
      companyType: value as string,
    });
    clearError('companyType');
  }

  async function sendForm(): Promise<void> {
    try {
      await validateErrors();

      const phone = formValues.phone.replace(/\D/g, '');

      setIsInProcess(true);

      const formData = new FormData();

      Object.entries(formValues).forEach(([key, value]: [string, string]) => {
        if (key === 'phone') {
          formData.append(key, `+998${phone}`);
        } else {
          formData.append(key, value);
        }
      });

      await httpQuery(
        `${APP_CONFIG.API_URL}/landing/forms/organisations/submit`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formDataToObject(formData)),
        },
      );

      setIsSend(true);
    } catch (e) {
      if (e instanceof HttpQueryError) {
        setIsError(true);
      }
    }

    setIsInProcess(false);
  }

  return (
    <AppForm
      className={styles.organisationQueryForm}
      title={t('form.title')}
    >
      {isSend || isError ? (
        <SendFormMessage error={isError} />
      ) : (
        <>
          <AppInput
            placeholder={t('form.name')}
            value={formValues.name}
            name={'name'}
            onInput={(e) => onInputHandler('name', e.target.value)}
            disabled={isInProcess}
            error={errors.name}
          />
          <AppDropdown
            placeholder={t('form.companyType')}
            value={formValues.companyType}
            name={'companyType'}
            onChange={choseOrganisationType}
            disabled={isInProcess}
            options={Array.from({ length: 6 }, (_, i) => ({
              label: t(`form.orgTypes.${i + 1}`),
              value: t(`form.orgTypes.${i + 1}`),
            }))}
            error={errors.companyType}
          />
          <AppInput
            placeholder={t('form.companyName')}
            value={formValues.companyName}
            name={'companyName'}
            onInput={(e) => onInputHandler('companyName', e.target.value)}
            disabled={isInProcess}
            error={errors.companyName}
          />
          <AppPhoneInput
            placeholder={'XX XXX-XX-XX'}
            value={formValues.phone}
            name={'phone'}
            onInput={(e) => onInputHandler('phone', e.target.value)}
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
