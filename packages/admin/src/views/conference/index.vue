<script setup lang="ts">
import { message } from 'ant-design-vue'
import { onMounted, ref } from 'vue'
import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'
import { WebRtc } from './webRTC'
import emitter from '@/utils/emitter'

const socketRef = ref<Socket>()
const WebRTCRef = ref<WebRtc>()

const localVideoRef = ref<HTMLVideoElement>()
const roomId = ref<string>()
const joinedRoom = ref<boolean>()
const onJoin = () => {
  if (roomId.value) WebRTCRef.value?.joinRoom(roomId.value)
  else message.info('请先输入房间号')
}
const showLocalVideo = () => {
  WebRTCRef.value?.getLocalStream({ width: 640, height: 480 }).then((stream) => {
    if (localVideoRef.value) localVideoRef.value.srcObject = stream
  })
}
onMounted(() => {
  socketRef.value = io('https://localhost:18081')
  if (socketRef.value) {
    // @ts-expect-error: xx
    WebRTCRef.value = new WebRtc(socketRef.value)
    showLocalVideo()
  }
  emitter.on('CREATED_ROOM', ({ room }) => {
    joinedRoom.value = true
    roomId.value = room
    showLocalVideo()
  })
  emitter.on('JOINED_ROOM', ({ room }) => {
    joinedRoom.value = true
    roomId.value = room
    showLocalVideo()
  })
})
</script>

<template>
  <div
    v-if="joinedRoom"
    class="relative"
  >
    <header class="text-lg">Room: {{ roomId }}</header>
    <div>videos</div>
    <video
      class="mt-4 inline-block rounded bg-white h-[300px] max-w-[400px] shadow-md absolute right-4 bottom-0"
      ref="localVideoRef"
      autoplay
      playsinline
      muted
    ></video>
  </div>
  <div
    v-else
    class="container p-8 flex flex-col items-center"
  >
    <div class="w-full flex">
      <a-input
        placeholder="请输入或创建房间号"
        v-model:value="roomId"
      />
      <a-button
        type="primary"
        class="ml-4"
        @click="onJoin"
      >
        加入
      </a-button>
    </div>
    <video
      autoplay
      playsinline
      muted
      class="mt-4 inline-block rounded bg-white h-[300px] max-w-[400px] shadow-md"
      ref="localVideoRef"
    ></video>
  </div>
</template>
