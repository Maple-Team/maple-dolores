import axios from 'axios'
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { API_TIMEOUT } from '@/utils/constant'
import emitter from '@/utils/emitter'

const isDEV = import.meta.env.DEV

const api = axios.create({
  timeout: API_TIMEOUT,
  validateStatus: (status) => status >= 200 && status < 300,
})

api.interceptors.request.use(
  async function (config: AxiosRequestConfig) {
    if (config.headers) {
      config.headers['X-API-VERSION'] = 'v1'
    }
    return config
  },
  function (error: AxiosError) {
    emitter.emit('REQUEST_ERROR', error)
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response: AxiosResponse) => {
    const { status, data, message } = response.data as BaseResponse<AnyToFix>
    // TODO handle download data
    if (status !== 200) {
      // TODO handle business exception
    } else {
      return data
    }
  },
  (error: AxiosError) => {
    emitter.emit('RESPONSE_ERROR', error)
    return Promise.reject(error)
  }
)

/**
 * 统一请求入口
 * @param config
 * @returns
 */
export const request = async <T = any>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const res = api.request({ method: 'GET', ...config })
    return res as unknown as Promise<T>
  } catch (error) {
    return Promise.reject(error)
  }
}
