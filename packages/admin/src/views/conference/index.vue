<script setup lang="ts">
import { message } from 'ant-design-vue'
import { onMounted, ref } from 'vue'
import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'
import { WebRtc } from './webRTC'
import type { Participant } from './types'
import emitter from '@/utils/emitter'

const socketRef = ref<Socket>()
const WebRTCRef = ref<WebRtc>()

const localVideoRef = ref<HTMLVideoElement>()
const roomId = ref<string>()
const joinedRoom = ref<boolean>()
const isAdmin = ref<boolean>()
const participants = ref<Participant[]>([])

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
    WebRTCRef.value?.initialize()
  })
  emitter.on('NEW_USER', ({ socketId, stream }) => {
    console.log('NEW_USER', socketId, stream)

    participants.value.push({
      uid: socketId,
      stream,
    })
    isAdmin.value = WebRTCRef.value?.isAdmin
    // for (const track of stream.getTracks()) {
    //   // 页面追加音轨或视频轨
    //   if (track.kind === 'audio') {
    //     //
    //   } else if (track.kind === 'video') {
    //     //
    //   }
    // }
  })
  emitter.on('USER_LEAVE', (user) => {
    console.log(user)
  })
})
</script>

<template>
  <div
    v-if="joinedRoom"
    class="relative"
  >
    <header class="text-lg">Room: {{ roomId }}</header>
    <a-row>
      <a-col
        :span="8"
        v-for="participant in participants"
        :key="participant.uid"
        class="relative"
      >
        <video
          autoplay
          playsinline
          muted
          :srcObject="participant.stream"
        ></video>
        <span class="absolute top-0 left-0">{{ participant.uid }}</span>
        <span
          class="absolute bottom-0 right-1/2 -translate-x-1/2"
          v-if="isAdmin"
        >
          Kick
        </span>
      </a-col>
    </a-row>
    <a-row
      class="absolute bottom-0 left-0 w-full h-[300px] pr-4"
      :gutter="12"
    >
      <a-col :span="12">
        <p>消息列表</p>
        <ul>
          <li>message 1</li>
        </ul>
      </a-col>
      <a-col
        :span="12"
        class="relative"
      >
        <video
          class="inline-block right-0 rounded bg-white h-[300px] w-full max-w-[400px] shadow-md absolute bottom-0"
          ref="localVideoRef"
          autoplay
          playsinline
          muted
        ></video>
      </a-col>
    </a-row>
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