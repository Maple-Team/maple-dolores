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
let socket2: WebSocket
const id = ref<string>('')

const sendMsg = () => {
  socket?.emit('broadcast', 'hello server')
}

onMounted(() => {
  socket = io('/socket.io/events')
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

  const host = location.host
  socket2 = new WebSocket(`ws://${host}/ws/a/b`)

  socket2.onopen = function (e) {
    console.log('[open] Connection established')
    console.log('Sending to server')
    socket2.send('My name is John')
  }

  socket2.onmessage = function (event) {
    console.log(`[message] Data received from server: ${event.data}`)
  }

  socket2.onclose = function (event) {
    if (event.wasClean) {
      console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`)
    } else {
      // e.g. server process killed or network down
      // event.code is usually 1006 in this case
      console.log('[close] Connection died')
    }
  }

  socket2.onerror = function (error) {
    console.log(`[error]`, error)
  }
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
