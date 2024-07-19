import { createI18n } from 'vue-i18n'

import zhCn from 'element-plus/es/locale/lang/zh-cn'
import zhTw from 'element-plus/es/locale/lang/zh-tw'
import enEl from 'element-plus/es/locale/lang/en'

import zh from './langs/zh'
import zhTW from './langs/zhTW'
import en from './langs/en'

const language = (navigator.language || 'en').toLocaleLowerCase() // 这是获取浏览器的语言
const i18n = createI18n({
  locale: localStorage.getItem('lang') || language.split('-')[0] || 'zh', // 首先从缓存里拿，没有的话就用浏览器语言，
  fallbackLocale: 'en', // 设置备用语言
  // locale: localStorage.getItem('lang') || 'zh', // 语言
  messages: {
    // 文案
    zh: { ...zh, ...zhCn }, // 文案的中文版
    en: { ...en, ...enEl }, // 文案的英文版
    zhTW: { ...zhTW, ...zhTw } // 文案的繁体版
  },
  legacy: false,
  globalInjection: true
})

export default i18n
