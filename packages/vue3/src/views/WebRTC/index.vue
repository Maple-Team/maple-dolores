<script setup lang="ts">
import { message } from 'ant-design-vue'
import { onMounted, onUnmounted, ref } from 'vue'
import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client'
import { WebRtc } from './webRTC'
import type { ChatMessage, ClientToServerEvents, Participant, ServerToClientEvents } from './types'
import emitter from '@/utils/emitter'

const socketRef = ref<Socket<ServerToClientEvents, ClientToServerEvents>>()
const WebRTCRef = ref<WebRtc>()

const localVideoRef = ref<HTMLVideoElement>()
const roomId = ref<string>()
const userName = ref<string>()

const joinedRoom = ref<boolean>()
const isAdmin = ref<boolean>()
const participants = ref<Participant[]>([])
const messages = ref<ChatMessage[]>([])
const currentMsg = ref<string>()

const onJoin = () => {
  if (!userName.value) {
    message.info('请输入用户名')
    return
  }

  if (!roomId.value) {
    message.info('请先输入房间号')
    return
  }

  WebRTCRef.value?.joinRoom(userName.value, roomId.value)
}

const onSend = () => {
  if (!currentMsg.value) return
  WebRTCRef.value?.sendText(currentMsg.value)
}

const showLocalVideo = () => {
  if (localVideoRef.value?.srcObject) {
    const localStream = localVideoRef.value.srcObject as MediaStream
    localStream.getTracks().forEach((track) => {
      track.stop()
    })
  }
  WebRTCRef.value?.getLocalStream({ width: 640, height: 480 }).then((stream) => {
    if (localVideoRef.value) localVideoRef.value.srcObject = stream
  })
}

onMounted(() => {
  socketRef.value = io('/events')
  if (socketRef.value) {
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
  emitter.on('NEW_USER', ({ socketId, stream, userName }) => {
    if (participants.value.find((item) => item.uid === socketId)) return
    console.log('NEW_USER', socketId, stream)

    participants.value.push({
      uid: socketId,
      stream,
      userName,
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

  emitter.on('CHAT_CONTENT', (chatMessage) => {
    messages.value.push(chatMessage)
  })
})
const kick = (uid: string) => {
  console.log(uid)
  WebRTCRef?.value?.kick(uid)
}
onUnmounted(() => {
  // WebRTCRef?.value?.localStream
  WebRTCRef.value?.leaveRoom()
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
        <span class="absolute top-0 left-0">{{ participant.userName }}</span>
        <span
          class="absolute bottom-0 right-1/2 -translate-x-1/2 cursor-pointer"
          v-if="isAdmin"
          @click="kick(participant.uid)"
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
        <ul class="h-[200px] overflow-auto flex flex-col bg-white py-1 px-2 rounded">
          <li
            v-for="msg in messages.sort((a, b) => a.ts - b.ts)"
            :key="msg.uuid"
            class="flex text-blue-300 mb-2 items-center"
            :class="{
              'self-end': msg.from === WebRTCRef?.myId,
              'text-green-300': msg.from === WebRTCRef?.myId,
            }"
          >
            <template v-if="msg.from === WebRTCRef?.myId">
              {{ msg.content }}
              <span class="inline-block p-1 bg-green-300 text-white rounded ml-1">{{ msg.userName }} </span>
            </template>
            <template v-else>
              <span class="inline-block p-1 bg-blue-300 text-white rounded mr-1">{{ msg.userName }} </span>
              {{ msg.content }}
            </template>
          </li>
        </ul>
        <div class="flex flex-col">
          <a-textarea
            v-model:value="currentMsg"
            placeholder="please input"
            allowClear
          />
          <a-button
            type="primary"
            class="mt-1 w-fit self-end"
            @click="onSend"
          >
            发送
          </a-button>
        </div>
      </a-col>
      <a-col
        :span="12"
        class="relative bg-white"
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
    <a-row
      :gutter="8"
      class="w-full"
    >
      <a-col :span="8">
        <a-input
          placeholder="用户名"
          v-model:value="userName"
        />
      </a-col>
      <a-col :span="8">
        <a-input
          placeholder="请输入或创建房间号"
          v-model:value="roomId"
        />
      </a-col>
      <a-col :span="8">
        <a-button
          type="primary"
          class="ml-4"
          @click="onJoin"
        >
          加入
        </a-button>
      </a-col>
    </a-row>
    <video
      autoplay
      playsinline
      muted
      class="mt-4 inline-block rounded bg-white h-[300px] max-w-[400px] shadow-md"
      ref="localVideoRef"
    ></video>
  </div>
</template>
