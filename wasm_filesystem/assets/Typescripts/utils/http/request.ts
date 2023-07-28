/* eslint-disable @typescript-eslint/ban-ts-comment */
import { EnvEnum } from '../../Enums'
import ActAxios from './Axios'
import { urlParams } from '../index'
//@ts-ignore
const { dev } = urlParams()

// 初始化Axios实例
export function createAxios(opt?: object) {
  return new ActAxios({
    // timeout: 5 * 1000,
    envBaseUrl: {
      development: 'http://api.dev.p1staff.com/mock/250',
      devStaging: 'http://intl-web-api.staging2.p1staff.com',
      staging: 'http://intl-web-api.staging2.p1staff.com',
      production: 'https://intl-web-api.tantanapp.com'
    },
    devEnv: dev === 'dev' ? EnvEnum.dev : dev === 'staging' ? EnvEnum.staging : EnvEnum.pro,
    // 报错后是否展示Toast
    isShowToast: true,
    ...opt
  })
}

export const defHttp = createAxios()
