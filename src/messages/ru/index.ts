import * as pages from './pages';

export const messages = {
  menu: {
    buyers: 'Покупателям',
    sellers: 'Продавцам',
    organisations: 'Финорганизациям',
  },
  questions: 'По всем вопросам обращайтесь на:',
  personalCabinet: 'Личный кабинет',
  footer: {
    questions: 'По всем вопросам обращайтесь на:',
    copyright: '{year} © FoyDa Broker. Все права защищены',
    privacy: 'Политика конфиденциальности',
    privacyLink: '/files/policy_rus.pdf',
  },
  meta: {
    title: 'FoyDa!',
    description:
      'Сервис FoyDa поможет вам приобрести товары и услуги в рассрочку быстро и комфортно. Мы сотрудничаем с банками и финансовыми организациями, чтобы увеличить вероятность одобрения и сделать ваши покупки доступными для семейного бюджета.',
    keywords:
      'покупка товаров в рассрочку, кредит на товар, покупка с рассрочкой Узбекистан',
  },
  formMessage: {
    success: {
      title: 'Спасибо!',
      subtitle:
        'Спасибо! Ваша заявка успешно отправлена. Менеджер свяжется с вами в ближайшее время',
    },
    error: {
      title: 'Ошибка',
      subtitle: 'Что-то пошло не так, попробуйте позже',
    },
  },
  partnersSection: {
    title: 'Магазины-партнеры',
  },
  financialOrganizationsSection: {
    title: 'Финансовые организации',
  },
  ...pages,
};
