import * as pages from './pages';

export const messages = {
  menu: {
    buyers: 'Xaridorlarga',
    sellers: 'Sotuvchilarga',
    organisations: 'Moliyaviy tashkilotlarga',
  },
  questions: 'Barcha savollar bo‘yicha murojaat qiling:',
  personalCabinet: 'Shaxsiy kabinet',
  footer: {
    questions: 'Barcha savollar bo‘yicha murojaat qiling:',
    copyright: '{year} © FoyDa Broker. Barcha huquqlar himoyalangan',
    privacy: 'Maxfiylik siyosati',
    privacyLink: '/files/policy_uz.pdf',
  },
  meta: {
    title: 'FoyDa!',
    description: 'Mehmonni xaridorga aylantiramiz',
    keywords:
      "bo'lib tovar sotib olish, tovarga kredit, bo'lib-bo'lib sotib olish O'zbekiston",
  },
  formMessage: {
    success: {
      title: 'Rahmat!',
      subtitle:
        "Sizning arizangiz muvaffaqiyatli yuborildi. Menejer tez orada siz bilan bog'lanadi",
    },
    error: {
      title: 'Xatolik',
      subtitle: 'Nimadir xato ketdi, keyinroq qayta urinib ko‘ring',
    },
  },
  partnersSection: {
    title: 'Hamkor do‘konlar',
  },
  financialOrganizationsSection: {
    title: 'Moliyaviy tashkilotlar',
  },
  ...pages,
};
