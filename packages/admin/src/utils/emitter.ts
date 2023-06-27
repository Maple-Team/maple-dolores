import type { AxiosError } from 'axios'
import mitt, { type Emitter } from 'mitt'

/**
 * 弹窗消息类型
 */
type MessageType = 'info' | 'success' | 'fail' | 'offline'

/**
 * 通用事件类型及参数
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type Events = {
  SESSION_EXPIRED?: string
  SHOW_MESSAGE: { message: string; type: MessageType }
  SHOW_LOADING?: string
  LOGIN_SUCCESS?: AnyToFix
  LOGOUT_SUCCESS?: string
  RESPONSE_ERROR: AxiosError
  REQUEST_ERROR: AxiosError
  // 业务
  CREATED_ROOM: { room: string; socketId: string }
  JOINED_ROOM: { room: string; socketId: string }
  USER_LEAVE: string
  NEW_USER: { socketId: string; stream: MediaStream }
}

/**
 * 事件管理实例
 */
const emitter: Emitter<Events> = mitt<Events>()

export default emitter
