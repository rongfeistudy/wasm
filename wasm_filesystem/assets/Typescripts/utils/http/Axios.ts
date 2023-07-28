/* eslint-disable @typescript-eslint/ban-ts-comment */
import tantanJsBridge from '../bridge.js'
// @ts-ignore
import { locationAddQuery, urlParams } from '../util'
import axios from './axios.min.js'
import { DEV } from 'cc/env'

import type { Result, CreateAxiosOptions, AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from '../../types/axios'
//@ts-ignore
const { user_id } = urlParams()

const MOCK_USERID = user_id || 128860

export default class ActAxios {
  private axiosInstance: AxiosInstance
  private readonly options: CreateAxiosOptions
  constructor(options: CreateAxiosOptions) {
    this.options = options
    this.axiosInstance = this.createAxios(options)
    this.setupInterceptors()
  }
  /**
   * @description:  Create axios instance
   */
  private createAxios(config: AxiosRequestConfig): AxiosInstance {
    const instance = axios.create(config)
    instance.defaults.baseURL = this.options.envBaseUrl[this.options.devEnv]
    return instance
  }
  /**
   * @description: Set general header
   */
  setHeader(headers: any): void {
    if (!this.axiosInstance) {
      return
    }
    Object.assign(this.axiosInstance.defaults.headers, headers)
  }
  /**
   * @description: Interceptor configuration
   */
  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use(async (config: AxiosRequestConfig): Promise<any> => {
      if (!config.url) return config
      // APP打开
      try {
        const [auth, xtest] = await Promise.all([tantanJsBridge.getAuthorizationHeader(config.url, config.data), tantanJsBridge.getAbHeader()])
        return {
          ...config,
          headers: {
            ...config.headers,
            Authorization: auth,
            'X-Testing-Group': xtest
          }
        }
      } catch (error) {
        // 本地开发 || (staging 且 非tantanApp打开)，mock用户
        if (DEV) {
          const resultUrl = locationAddQuery(config.url, 'user_id', MOCK_USERID)
          config.url = resultUrl
        }
        return config
      }
    })
    // Response result interceptor processing
    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      return res.data
    })
  }
  get<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }
  request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<Result>>(config)
        .then((res: AxiosResponse<Result>) => {
          resolve(res as unknown as Promise<T>)
        })
        .catch((e: Error | AxiosError) => {
          // this.options.isShowToast && Toast('Network Error')
          // Sentry 上报
          reject(e)
        })
    })
  }
}
