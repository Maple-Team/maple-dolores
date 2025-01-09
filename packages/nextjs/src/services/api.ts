import axios from 'axios'
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import type { BaseResponse } from '@liutsing/types-utils'

const API_TIMEOUT = 30000
declare module 'axios' {
  interface AxiosRequestConfig {
    /**
     * 是否有前缀
     */
    noPrefix?: boolean
    isDownloadReq?: boolean
  }
}

// const isDEV = import.meta.env.DEV

const api = axios.create({
  timeout: API_TIMEOUT,
  validateStatus: (status) => status >= 200 && status < 300,
})

api.interceptors.request.use(
  async (config) => {
    if (config.headers) config.headers['X-API-VERSION'] = 'v1'

    if (!config.noPrefix) config.url = `/api${config.url || ''}`
    return config
  },
  (error: AxiosError) => {
    // emitter.emit('REQUEST_ERROR', error)
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.config.isDownloadReq) return response
    const { status, data } = response.data as BaseResponse<AnyToFix>
    if (status !== 0) {
      // TODO handle business exception
    } else {
      return data
    }
  },
  (error: AxiosError) => {
    // emitter.emit('RESPONSE_ERROR', error)
    throw error
  }
)

/**
 * 统一请求入口
 * @param config
 * @returns
 */
export const request = async <T = AnyToFix>(config: AxiosRequestConfig): Promise<T> => {
  try {
    return api.request<AnyToFix, Promise<T>>({ method: 'GET', ...config })
  } catch (error) {
    return Promise.reject(error)
  }
}
