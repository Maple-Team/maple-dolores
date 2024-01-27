import type { AxiosError, AxiosResponse } from 'axios'
import axios from 'axios'

const instance = axios.create()

instance.interceptors.request.use(
  (config) => {
    if (config.headers) {
      // @ts-expect-error: xx
      config.headers = {
        ...config.headers,
        'X-API-VERSION': 'v1',
      }
    }
    return config
  },
  (e) => {
    console.error('req error', e)
  }
)
instance.interceptors.response.use(
  (res: AxiosResponse<BaseResponse<AnyToFix>>) => {
    const { data, status } = res

    if (status === 200) return data.data
    else return Promise.reject(data)
  },
  (e: AxiosError) => {
    return Promise.reject(e)
  }
)

export default instance
