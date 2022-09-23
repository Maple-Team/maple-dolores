<template>
  <p>
    <a-button
      type="primary"
      @click="sendMsg"
      >Send</a-button
    >
  </p>
  <ul>
    <li
      v-for="(message, index) in messages"
      :key="index"
    >
      {{ message }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue'
import { io, Socket } from 'socket.io-client'
import { message } from 'ant-design-vue'

const messages = ref<string[]>([])
let socket: Socket

const id = ref<string>('')

const sendMsg = () => {
  socket?.emit('broadcast', 'hello server')
}

onMounted(() => {
  socket = io('http://localhost:3090/events')
  socket.on('connect', () => {
    message.success('ws connected')
    id.value = socket!.id
    socket.on(id.value, (e) => {
      console.log('收到专属信息', e)
      // messages.value.push(e)
    })
    socket.emit('register', id.value)
  })

  socket.on('onRegister', (e) => {
    console.log(e)
    messages.value.push(e)
  })

  socket.on('broadcast', (e) => {
    console.log('broadcast', e)
  })

  socket.on('error', (e) => {
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
    //@ts-ignore
    socket = null
  }
})
</script>
