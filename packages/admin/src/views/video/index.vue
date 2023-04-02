<template>
  <div class="flex">
    <div class="flex-1 flex flex-col">
      <VideoPlayer
        :options="options"
        class="rounded"
      />
      <div class="bg-white mt-3 rounded p-2 flex-1">
        <div>标题:</div>
        <div>时间: {{ title }}</div>
        <div>
          关键字:
          <!-- <a-tag color="red">黑丝</a-tag>
          <a-tag color="red">牛仔裤</a-tag>
          <a-tag color="red">T恤</a-tag>
          <a-tag color="red">白衬衫</a-tag>
          <a-tag color="red">羊毛衫</a-tag>
          <a-tag color="red">古装</a-tag> -->
        </div>
      </div>
    </div>
    <a-menu
      style="width: 160px; margin-left: 12px"
      class="h-[calc(100vh-42px)] overflow-auto rounded"
      mode="inline"
      :open-keys="openKeys"
      @openChange="onOpenChange"
    >
      <a-sub-menu
        v-for="item in playList"
        :key="item.date"
      >
        <template #title>{{ item.date }}</template>
        <a-menu-item
          v-for="t in item.time"
          :key="t"
          class="cursor-pointer"
        >
          <span @click="setPlayUrl(item.date, t)">
            {{ t }}
          </span>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>
<script setup lang="ts">
import VideoPlayer from './VideoPlayer.vue'
import { ref } from 'vue'
import { PlayerOptions } from './type'
import playList from './playlist.json'
import { chunk } from 'lodash-es'

const options = ref<PlayerOptions>({
  sources: [
    {
      src: `http://localhost:4091/bilibili/liuzaozao/lzz/lzzshort/playlist.m3u8`,
      type: 'application/vnd.apple.mpegurl',
    },
  ],
  autoplay: false,
  controls: true,
  fluid: true,
  controlBar: {
    children: [
      {
        name: 'playToggle',
      },
      {
        name: 'volumePanel',
      },
      {
        name: 'FullscreenToggle',
      },
      {
        name: 'progressBar',
      },
      {
        name: 'bigPlayButton',
      },
      {
        name: 'progressControl',
      },
      {
        name: 'playbackRateMenuButton',
      },
      {
        name: 'currentTimeDisplay',
      },
      {
        name: 'durationDisplay',
      },
      {
        name: 'subtitlesButton',
      },
      {
        name: 'captionsButton',
      },
      {
        name: 'chaptersButton',
      },
      {
        name: 'seekToLive',
      },
      {
        name: 'subsCapsButton',
      },
    ],
  },
})
const setPlayUrl = (date: string, time: string) => {
  const timeChunksStr = chunk(time.split(''), 2)
    .map((item) => item.join(''))
    .join(':')
  const dateArr = date.replace(/(?<=\d{4})\d+/, ($0) => `-${$0}`).split('-')
  title.value = `${dateArr[0]}-${dateArr[1].replace(/(?<=\d{2})\d+/, ($0) => `-${$0}`)} ${timeChunksStr}`
  options.value.sources = [
    {
      src: `http://localhost:4091/bilibili/liuzaozao/${date}/${date}${time}/playlist.m3u8`,
      type: 'application/vnd.apple.mpegurl',
    },
  ]
}
const title = ref<string>()

const openKeys = ref<string[]>([])

const onOpenChange = (keys: string[]) => {
  const latestOpenKey = keys.find((key) => openKeys.value.indexOf(key) === -1)
  openKeys.value = latestOpenKey ? [latestOpenKey] : []
}
</script>
