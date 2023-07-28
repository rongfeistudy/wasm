import { urlParams } from './util'
import { LanguageType } from '../Enums'

// 系统语言
export const systemLangToLang: { [protoName: string]: string } = {
  'zh-Hans': 'tantan-h5-zh',
  en: 'tantan-h5-en-US',
  id: 'tantan-h5-id-ID',
  'zh-Hant': 'tantan-h5-zh-TW',
  ja: 'tantan-h5-ja',
  ko: 'tantan-h5-ko',
  th: 'tantan-h5-th-TH',
  vi: 'tantan-h5-vi-VN'
}
/** App外获取语种 */
export function getLanguage() {
  const language = navigator.language.toLowerCase()
  const lang = urlParams()['lang'] || language.substring(0, 2) || ''
  let id
  switch (lang.toLowerCase()) {
    case 'en':
    case 'en-us':
      id = 'tantan-h5-en-US'
      break
    case 'zh':
    case 'zh-cn':
      if (language === 'zh-cn') {
        id = 'tantan-h5-zh'
      } else {
        id = 'tantan-h5-zh-TW'
      }
      break
    case 'ja':
    case 'ja-jp':
      id = 'tantan-h5-ja'
      break
    case 'ko':
    case 'ko-cn':
    case 'ko-kr':
      id = 'tantan-h5-ko'
      break
    case 'hant':
    case 'zh-tw':
      id = 'tantan-h5-zh-TW'
      break
    case 'id':
    case 'id-id':
      id = 'tantan-h5-id-ID'
      break
    case 'vi':
      id = 'tantan-h5-vi-VN'
      break
    case 'th':
    case 'th-TH':
      id = 'tantan-h5-th-TH'
      break
    default:
      id = 'tantan-h5-zh'
      break
  }
  return id
}

/** 项目的默认语种*/

export const defaultLangs = [LanguageType.en, LanguageType.id, LanguageType['zh-Hans'], LanguageType['zh-Hant']]
