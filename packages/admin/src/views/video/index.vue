<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { chunk } from 'lodash-es'
import type { LzzModel, PlayerOptions } from './type'
import { usePaginationQuery } from './api'
import VideoPlayer from './VideoPlayer.vue'

interface Item {
  date: string
  time: string
  dateStr: string
  timeStr: string
  _id: string
  options: PlayerOptions
}
const pageSize = ref<number>(6)
const current = ref<number>(1)

const { data, isFetching } = usePaginationQuery({ pageSize: pageSize.value, current })

const transFormData = computed(() => {
  return (
    data.value?.records.reduce((acc: Item[], { time, date, _id }: LzzModel) => {
      const dateArr = date.replace(/(?<=\d{4})\d+/, ($0) => `-${$0}`).split('-')
      const times = time.map((i) => {
        const timeChunksStr = chunk(i.split(''), 2)
          .map((item) => item.join(''))
          .join(':')

        const item: Item = {
          timeStr: timeChunksStr,
          _id,
          date,
          time: i,
          dateStr: `${dateArr[0]}-${dateArr[1].replace(/(?<=\d{2})\d+/, ($0) => `-${$0}`)}`,
          options: {
            sources: [
              {
                src: `http://localhost:4091/bilibili/liuzaozao/${date}/${date}${i}/playlist.m3u8`,
                type: 'application/vnd.apple.mpegurl',
              },
            ],
            autoplay: false,
            controls: true,
            fluid: true,
            bigPlayButton: false,
          },
        }
        return item
      })
      return [...acc, ...times]
    }, []) || []
  )
})
</script>

<template>
  <div class="flex flex-col">
    <a-spin
      :spinning="isFetching"
      wrapperClassName="flex-1 overflow-auto bg-white p-2"
    >
      <a-row :gutter="[16, 16]">
        <a-col
          :span="4"
          v-for="{ _id, dateStr, options, date, time } in transFormData"
          :key="`${_id}_${time}`"
        >
          <RouterLink :to="`/video/${_id}?date=${date}&time=${time}`">
            <VideoPlayer
              :options="options"
              class="rounded h-40"
            />
            <span>{{ dateStr }} {{ time.substring(0, 2) }}点场 </span>
          </RouterLink>
        </a-col>
      </a-row>
    </a-spin>
    <a-pagination
      v-model:current="current"
      v-model:pageSize="pageSize"
      :total="data?.pagination.total"
      class="bg-white !p-2 rounded"
    />
  </div>
</template>
