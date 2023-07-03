import { onMounted, onUnmounted, ref } from 'vue'
import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'
import { notification } from 'ant-design-vue'

export const useNotification = () => {
  const id = ref<string>('')
  let socket: Socket

  onMounted(() => {
    //   socket = io('http://localhost:3000') // 直连 默认path: /socket.io/
    socket = io('/') // 转发
    socket.on('connect', async () => {
      notification.info({ message: '通知', description: 'WebSocket服务已成功建立' })
      id.value = socket.id

      socket.on(id.value, (e) => {
        console.log('收到专属信息', e)
      })

      socket.on('broadcast', (e) => {
        console.log('broadcast', e)
      })

      socket.on('notification', (msg: string) => {
        notification.info({ message: '通知', description: msg })
      })

      socket.on('error', (e) => {
        console.error(e)
      })
    })
  })

  onUnmounted(() => {
    socket?.off('*')
    socket?.disconnect()
  })
}
