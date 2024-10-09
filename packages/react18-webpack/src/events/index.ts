import type { NoticeType } from 'antd/es/message/interface'
import type { AxiosError } from 'axios'
import mitt, { type Emitter } from 'mitt'

/**
 * 通用事件类型及参数
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type Events = {
  SESSION_EXPIRED?: string
  SHOW_MESSAGE: { message: string; type: NoticeType; key?: string }
  SHOW_LOADING?: string
  LOGIN_SUCCESS?: AnyToFix
  LOGOUT_SUCCESS?: string
  RESPONSE_ERROR: AxiosError
  REQUEST_ERROR: AxiosError
  REDIRECT_LOGIN: string
  REDIRECT_403: void
}

/**
 * 事件管理实例
 */
const emitter: Emitter<Events> = mitt<Events>()

export { emitter }
