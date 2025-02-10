<script setup lang="ts">
import { computed, nextTick, onUpdated, ref } from 'vue'
import { chunk } from 'lodash-es'
import { useRoute, useRouter } from 'vue-router'
import VideoPlayer from './VideoPlayer.vue'
import type { LzzModel, PlayerOptions } from './type'
import { useListQuery } from './api'

const route = useRoute()
const router = useRouter()

const query = route.query
const date = ref<string>(query.date as string)
const time = ref<string>(query.time as string)

const options = computed<PlayerOptions>(() => ({
  sources: [
    {
      src: `http://localhost:4091/bilibili/liuzaozao/${date.value}/${date.value}${time.value}/playlist.m3u8`,
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
}))

const getTitleStr = (date: string, time: string) => {
  const dateArr = date.replace(/(?<=\d{4})\d+/, ($0) => `-${$0}`).split('-')
  const timeChunksStr = chunk(time.split(''), 2)
    .map((item) => item.join(''))
    .join(':')
  return `${dateArr[0]}-${dateArr[1].replace(/(?<=\d{2})\d+/, ($0) => `-${$0}`)} ${timeChunksStr}`
}
const title = computed(() => getTitleStr(date.value, time.value))

const openKeys = ref<string[]>([date.value])
const selectedKeys = ref<string[]>([time.value])

const updateDateTime = ({ _id, date: dateStr }: LzzModel, timeStr: string) => {
  router
    .push({
      path: `/video/${_id}`,
      query: {
        date: dateStr,
        time: timeStr,
      },
    })
    .then(() => {
      date.value = dateStr
      time.value = timeStr
    })
}

const onOpenChange = (keys: string[]) => {
  const latestOpenKey = keys.find((key) => openKeys.value.indexOf(key) === -1)
  openKeys.value = latestOpenKey ? [latestOpenKey] : []
}
const { data, isFetching } = useListQuery()

onUpdated(() => {
  console.log(query, date.value, time.value)
})

nextTick(() => {
  console.log('nextTick')
  // TODO 滚动处理
  try {
    document.getElementById(`${date.value}-${time.value}`)?.scrollIntoView({ behavior: 'smooth' })
  } catch (err) {
    console.error('nexttick', err)
  }
})
</script>

<template>
  <div class="flex">
    <div class="flex-1 flex flex-col">
      <VideoPlayer
        :options="options"
        class="rounded"
      />
      <div class="bg-white mt-3 rounded p-2 flex-1">
        <div>标题: 刘灶灶日常直播{{ time.substring(0, 2) }}点场</div>
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
    <a-spin :spinning="isFetching">
      <a-menu
        style="width: 160px; margin-left: 12px"
        class="h-[calc(100vh-42px)] overflow-auto rounded"
        mode="inline"
        :open-keys="openKeys"
        @openChange="(e) => onOpenChange(e as string[])"
        v-model:selectedKeys="selectedKeys"
      >
        <a-sub-menu
          v-for="item in data"
          :key="item[0].date"
        >
          <template #title>{{ item[0].date }}</template>
          <a-menu-item
            v-for="t in item[0].time"
            :key="t"
            class="cursor-pointer"
          >
            <span
              @click="updateDateTime(item[0], t)"
              :id="`${date}-${t}`"
            >
              {{ t }}
            </span>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-spin>
  </div>
</template>
