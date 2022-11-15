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

import { message } from 'ant-design-vue'

const messages = ref<string[]>([])
let socket: WebSocket

const id = ref<string>('')

const sendMsg = () => {
  socket?.send('hello')
}

onMounted(() => {
  const host = location.host
  socket = new WebSocket(
    `ws://${host}/aws/ws/patrol/vehicles?_t=&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyLXR5cGUiOjEsInVzZXItbmFtZSI6ImFkbWluIiwidXNlci1pZCI6IjEiLCJleHAiOjE2Njg1MzEyNTF9.JmJtWs9Ol2UYOsE7XUdREgH7vo8i71vpIWK5zRmPisk`
  )

  socket.onopen = function (e) {
    console.log('[open] Connection established')
    console.log('Sending to server')
    socket.send('My name is John')
  }

  socket.onmessage = function (event) {
    console.log(`[message] Data received from server: ${event.data}`)
  }

  socket.onclose = function (event) {
    if (event.wasClean) {
      console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`)
    } else {
      // e.g. server process killed or network down
      // event.code is usually 1006 in this case
      console.log('[close] Connection died')
    }
  }

  socket.onerror = function (error) {
    console.log(`[error]`)
  }
})

onBeforeUnmount(() => {})

onUnmounted(() => {
  if (socket) {
  }
})
</script>
