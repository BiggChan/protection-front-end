import { createI18n } from 'vue-i18n'
import zhCN from './zh_CN'
import en from './en'

const languages = {
  en: {
    ...en
  },
  zh_CN: {
    ...zhCN
  }
}

export const getLocale = () => {
  // const cookieLanguage = getLanguage()
  // if (cookieLanguage) {
  //     return cookieLanguage
  // }
  // const language = navigator.language.toLowerCase()
  // const locales = Object.keys(languages)
  // for (const locale of locales) {
  //     if (language.indexOf(locale) > -1) {
  //         return locale
  //     }
  // }
  return 'zh_CN'
}

const i18n = createI18n({
  locale: getLocale(),
  messages: languages
})

export default i18n
