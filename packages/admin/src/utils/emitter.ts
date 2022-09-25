import type { AxiosError } from 'axios'
import mitt, { type Emitter } from 'mitt'

/**
 * 弹窗消息类型
 */
type MessageType = 'info' | 'success' | 'fail' | 'offline'

/**
 * 通用事件类型及参数
 */
export type Events = {
  SESSION_EXPIRED?: string
  SHOW_MESSAGE: { message: string; type: MessageType }
  SHOW_LOADING?: string
  LOGIN_SUCCESS?: AnyToFix
  LOGOUT_SUCCESS?: string
  RESPONSE_ERROR: AxiosError
  REQUEST_ERROR: AxiosError
}

/**
 * 事件管理实例
 */
const emitter: Emitter<Events> = mitt<Events>()

export default emitter
