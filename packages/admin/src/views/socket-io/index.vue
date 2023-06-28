<script setup lang="ts">
import { onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue'
import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'
import { message } from 'ant-design-vue'

const messages = ref<string[]>([])
let socket: Socket
const id = ref<string>('')

const sendMsg = () => {
  socket?.emit('broadcast', `[socket.io] hello server: ${new Date().getTime()}`)
}

onMounted(() => {
  //   socket = io('http://localhost:3000') // 直连
  socket = io({ path: '/socket.io' }) // 转发
  socket.on('connect', () => {
    message.success('socket.io ws connected')

    id.value = socket!.id

    try {
      socket.emit('register', socket!.id)
    } catch (error) {
      console.error(error, '==emit register error==')
    }
  })

  socket.on(id.value, (e) => {
    console.log('收到专属信息', e)
    // messages.value.push(e)
  })

  socket.on('onRegister', (e) => {
    console.log(e)
    messages.value.push(e)
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
  <ul>
    <li
      v-for="(msg, index) in messages"
      :key="index"
    >
      {{ msg }}
    </li>
  </ul>
</template>
