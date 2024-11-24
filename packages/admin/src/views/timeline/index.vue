<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
import { capitalize } from '@liutsing/utils'
import { groupBy, values } from 'lodash-es'
import type { Timeline } from './type'
import { useListQuery } from './api'

const { query } = useRoute()
const { page } = query as { page?: number }
const current = ref<number>(page || 1)
const pageSize = ref<number>(10 * 100)
const type = ref<Timeline['type']>()
const handleChange = (e: Timeline['type']) => {
  type.value = e
}
const { isLoading, data } = useListQuery({
  current,
  pageSize,
  type,
})

const currentDate = dayjs().format('dddd, MMMM D, YYYY')

const notTodayRecords = computed(() => {
  const records = data.value?.records.filter(({ date }) => date !== currentDate)
  return values(groupBy(records, 'date'))
})
const todayRecords = computed(() => data.value?.records.filter(({ date }) => date === currentDate))
</script>

<template>
  <div class="p-4 bg-white">
    <template v-if="isLoading">
      <a-spin :spinning="isLoading" />
    </template>
    <template v-else>
      <a-select
        v-model:value="type"
        class="!mb-3 w-[120px]"
        @change="(e) => handleChange(e as 'timeline'|'treehole')"
      >
        <a-select-option value="">All</a-select-option>
        <a-select-option value="timeline">Timeline</a-select-option>
        <a-select-option value="treehole">Treehole</a-select-option>
      </a-select>
      <a-timeline>
        <a-timeline-item v-if="todayRecords?.length">
          <p class="text-blue-500">
            {{ todayRecords[0].date }}
          </p>
          <p
            v-for="record in todayRecords"
            :key="record.content"
            class="mb-0"
          >
            <a-tag color="rgb(59 130 246)">#{{ capitalize(record.type) }}</a-tag
            >{{ record.time }}:
            {{ record.content }}
          </p>
        </a-timeline-item>
        <a-timeline-item
          color="green"
          v-for="(record, index) in notTodayRecords"
          :key="index"
        >
          <p class="text-green-500">
            {{ record[0].date }}
          </p>
          <p
            v-for="item in record"
            :key="item.content"
            class="mb-0"
          >
            <a-tag color="rgb(34 197 94)">#{{ capitalize(item.type) }}</a-tag
            >{{ item.time }}: {{ item.content }}
          </p>
        </a-timeline-item>
      </a-timeline>
    </template>
  </div>
</template>
