import { onMounted, onUnmounted, ref } from 'vue'
import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'
import { notification } from 'ant-design-vue'

export const useNotification = () => {
  const id = ref<string>('')
  let socket: Socket

  onMounted(() => {
    socket = io('/default', {
      query: {
        token: '123',
      },
    }) // 转发
    socket.on('connect', async () => {
      id.value = socket.id

      socket.on(id.value, (e) => {
        console.log('收到专属信息', e)
      })

      socket.on('broadcast', (e) => {
        console.log('broadcast', e)
      })

      socket.on('notification', (msg: string) => {
        notification.info({ message: '通知', description: msg, duration: 1000 })
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
