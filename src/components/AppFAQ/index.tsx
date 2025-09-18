import { useTranslations } from 'next-intl';

import AppAccordion from '@/components/AppAccordion';

import styles from './styles.module.scss';

interface Question {
  title: string;
  content: string;
}

export default function AppFAQ() {
  const t = useTranslations('buyers');

  const questions: Question[] = Array.from({ length: 5 }, (_, i) => ({
    title: t(`faqSection.questions.${i}.title`),
    content: t(`faqSection.questions.${i}.answer`),
  }));

  return (
    <div className={styles.appFAQ}>
      {questions.map((question, index) => (
        <AppAccordion
          className={styles.accordion}
          title={question.title}
          key={index}
        >
          {question.content}
        </AppAccordion>
      ))}
    </div>
  );
}
