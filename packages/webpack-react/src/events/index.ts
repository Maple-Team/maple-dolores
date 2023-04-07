import mitt from 'mitt'
import type { Message, RemoteControlResult, VehicleResult } from '@/types'

interface Events {
  /**
   * websocket事件
   */
  websocketMsg: Message & {
    /**
     * 是否单车
     */
    isSingle: boolean
  }

  /**
   * 远控结果
   */
  remoteControlResult: RemoteControlResult
  /**
   * 实时车况
   */
  rtStatus: VehicleResult
}

export const emitter = mitt<Events>()
