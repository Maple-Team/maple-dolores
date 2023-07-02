<script setup lang="ts">
import { onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue'
import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'
import { message } from 'ant-design-vue'

const ids = ref<string[]>([])
const id = ref<string>('')
let socket: Socket

const sendMsg = () => {
  socket?.emit('broadcast', `[socket.io] hello server: ${new Date().getTime()}`)
}

onMounted(() => {
  //   socket = io('http://localhost:3000') // 直连 默认path: /socket.io/
  socket = io('/') // 转发
  socket.on('connect', () => {
    message.success('socket.io ws connected')

    id.value = socket!.id
    try {
      socket.emit('register', socket!.id)
    } catch (error) {
      console.error(error)
    }
  })

  socket.on(id.value, (e) => {
    console.log('收到专属信息', e)
  })

  socket.on('onRegister', (e) => {
    message.success('收到注册回复的消息')

    ids.value = JSON.parse(e).ids
  })

  socket.on('broadcast', (e) => {
    console.log('broadcast', e)
  })

  socket.on('error', (e) => {
    console.error(e)
    message.error(JSON.stringify(e))
  })
})

onBeforeUnmount(() => {
  socket.emit('unRegister', id.value)
})

onUnmounted(() => {
  if (socket) {
    socket?.off('*')
    socket?.disconnect()
  }
})
</script>

<template>
  <p>
    <a-button
      type="primary"
      @click="sendMsg"
    >
      Send
    </a-button>
  </p>
  <ul class="w-full overflow-auto">
    <li
      v-for="i in ids"
      :key="i"
    >
      {{ i }}
    </li>
  </ul>
</template>
