<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { message } from 'ant-design-vue'

const messages = ref<string[]>([])
let ws: WebSocket

const sendMsg = () => {
  ws?.send(`[ws] hello: ${new Date().getTime()}`)
}

onMounted(() => {
  const host = location.host
  ws = new WebSocket(`ws://${host}/ws/a/b`)

  ws.onopen = function () {
    message.success('native websocket ws connected')
    console.log('[ws open] Connection established')
    console.log('[ws] Sending to server')
    ws.send('[ws] My name is John')
  }

  ws.onmessage = function (event) {
    console.log(`[ws message] Data received from server: ${event.data}`)
  }

  ws.onclose = function (event) {
    if (event.wasClean) {
      console.log(`[ws close] Connection closed cleanly, code=${event.code} reason=${event.reason}`)
    } else {
      // e.g. server process killed or network down
      // event.code is usually 1006 in this case
      console.log('[ws close] Connection died')
    }
  }

  ws.onerror = function (error) {
    console.log('[ws error]', error)
  }
})

onUnmounted(() => {
  if (ws) ws.close()
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
