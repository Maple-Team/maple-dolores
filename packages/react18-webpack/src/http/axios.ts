import type { BaseResponse } from '@liutsing/types-utils'
import type { AxiosError, AxiosResponse, CancelTokenSource, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { emitter } from '@/events'
import { useNotificationStore } from '@/stores/notifications'

const API_TIMEOUT = 30 * 1000

declare module 'axios' {
  /**
   * NOTE 拓展axios请求字段
   */
  interface AxiosRequestConfig {
    /**
     * 是否为外部请求
     */
    isExternalReq?: boolean
    /**
     * 是否为上传请求
     */
    isUploadReq?: boolean
    /**
     * 是否为下载请求
     */
    isDownloadReq?: boolean
    /**
     * 是否有前缀
     */
    noPrefix?: boolean
    /**
     * 是否为刷新请求
     */
    isRefreshToken?: boolean
  }
}
let cancelTokenSource: CancelTokenSource
const instance = axios.create({
  timeout: API_TIMEOUT,
  validateStatus: (status) => (status >= 200 && status < 500) || status === 403,
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
    'X-API-VERSION': 'v1',
  },
})

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<AnyToFix>) => {
    cancelTokenSource = axios.CancelToken.source()
    config.cancelToken = cancelTokenSource.token
    const accessToken = getAccessToken()
    if (config.url !== '/auth/login' && !accessToken)
      if (cancelTokenSource) cancelTokenSource.cancel('accessToken is missing')

    if (!config.noPrefix) config.url = `/api${config.url || ''}`
    // 处理token
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)
let promise: Promise<boolean> | null
instance.interceptors.response.use(
  async (response: AxiosResponse<BaseResponse<AnyToFix>>) => {
    if (response.config.isDownloadReq) return response
    const jwt: string = response.headers['x-authorization']
    if (jwt) {
      setAccessToken(jwt)
      instance.defaults.headers.Authorization = `Bearer ${jwt}`
    }
    const token = response.headers['x-refresh-token']
    if (token) setRefreshToken(token)
    // 处理刷新token请求的结果
    if (response.config.url === '/api/auth/refresh') return response.status === 200

    if (response.status === 401 && !response.config.isRefreshToken) {
      // 判断刷新请求本身是否成功
      const isSuccess = await refreshToken()
      if (isSuccess) {
        // 有了token之后再次请求之前401的接口
        response.config.headers.Authorization = `Bearer ${getAccessToken()}`
        return await instance.request({
          ...response.config,
          url: response.config.url?.replace(/^\/api/, ''),
        })
      } else {
        const redirect = location.pathname
        setRefreshToken('')
        setAccessToken('')
        emitter.emit('REDIEECT_LOGIN', redirect)
        return
      }
    }

    const { status, data, message } = response.data

    if (response.status === 403) {
      emitter.emit('REDIRECT_403')
      return response.status
    }
    switch (status) {
      case 200:
      case 201:
        return data
      // 其他的业务码
      default:
        emitter.emit('SHOW_MESSAGE', {
          message,
          type: 'error',
          key: message,
        })
        return Promise.reject(message)
    }
  },
  (error: AxiosError) => {
    console.error(error)
    if (axios.isCancel(error)) return

    const e = error as AxiosError

    const message = e.message || 'unKnown error'
    useNotificationStore.getState().addNotification({
      type: 'error',
      title: 'Error',
      message,
    })

    return Promise.reject(e)
  }
)

export { instance }

export function getAccessToken() {
  return localStorage.getItem('jwt') || ''
}

function setAccessToken(accessToken: string) {
  return localStorage.setItem('jwt', accessToken)
}
function setRefreshToken(token: string) {
  return localStorage.setItem('token', token)
}

function getRefreshToken() {
  return localStorage.getItem('token') || ''
}
async function refreshToken() {
  if (promise) return promise
  // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
  promise = new Promise<boolean>(async (resolve) => {
    const res: boolean = await instance.get('/auth/refresh', {
      headers: {
        Authorization: `Bearer ${getRefreshToken()}`,
      },
      isRefreshToken: true,
    })
    resolve(res)
  })

  promise.finally(() => {
    promise = null
  })
  return promise
}
