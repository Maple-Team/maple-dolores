<template>
  <div class="flex">
    <div class="video-container">
      <VideoPlayer :options="options" />
    </div>
    <a-row class="flex-1">
      <a-col
        v-for="item in playList"
        :key="item.date"
        :span="12"
      >
        {{ item.date }}
        <a-row>
          <a-col
            v-for="t in item.time"
            :key="t"
            :span="8"
            class="cursor-pointer"
            @click="setPlayUrl(item.date, t)"
          >
            {{ t }}
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>
<script setup lang="ts">
import VideoPlayer from './VideoPlayer.vue'
import { ref } from 'vue'
import { PlayerOptions } from './type'
import playList from './playlist.json'

const options = ref<PlayerOptions>({
  sources: [
    {
      src: 'http://localhost:4091/bilibili/liuzaozao/20230309/20230309122042/playlist.m3u8',
      type: 'application/vnd.apple.mpegurl',
    },
  ],
  autoplay: true,
  controls: true,
  fluid: true,
  controlBar: {
    children: [
      {
        name: 'volumePanel',
      },
      {
        name: 'FullscreenToggle',
      },
    ],
  },
})
const setPlayUrl = (date: string, time: string) => {
  options.value.sources = [
    {
      src: `http://localhost:4091/bilibili/liuzaozao/${date}/${date}${time}/playlist.m3u8`,
      type: 'application/vnd.apple.mpegurl',
    },
  ]
}
</script>
<style scoped>
.video-container {
  width: 500px;
  height: 400px;
}
</style>
