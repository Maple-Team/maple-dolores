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
  debugger
  socket?.emit('broadcast', '[socket.io] hello server: ' + new Date().getTime())
  socket2?.send('[ws] hello: ' + new Date().getTime())
}

onMounted(() => {
  socket = io('http://localhost:3000/events')
  // socket = io('/', { path: '/socket.io/events' })
  socket.on('connect', () => {
    message.success('socket.io ws connected')

    id.value = socket!.id

    try {
      socket.emit('register', socket!.id)
    } catch (error) {
      console.error(error, '==ermit register error==')
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

  const host = location.host
  socket2 = new WebSocket(`ws://${host}/ws/a/b`)

  socket2.onopen = function (e) {
    message.success('native websocket ws connected')
    console.log('[ws open] Connection established')
    console.log('[ws] Sending to server')
    socket2.send('[ws] My name is John')
  }

  socket2.onmessage = function (event) {
    console.log(`[ws message] Data received from server: ${event.data}`)
  }

  socket2.onclose = function (event) {
    if (event.wasClean) {
      console.log(`[ws close] Connection closed cleanly, code=${event.code} reason=${event.reason}`)
    } else {
      // e.g. server process killed or network down
      // event.code is usually 1006 in this case
      console.log('[ws close] Connection died')
    }
  }

  socket2.onerror = function (error) {
    console.log(`[ws error]`, error)
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
  if (socket2) {
    socket2.close()
  }
})
</script>
