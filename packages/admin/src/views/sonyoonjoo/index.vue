<script setup lang="ts">
import { reactive, ref, toRaw } from 'vue'
import { RouterLink } from 'vue-router'
import type { BaseList } from '@liutsing/types-utils'
import { useInfiniteQuery, useQuery } from '@tanstack/vue-query'
import type { SonYoonJoo } from './type'
import { fetchList, fetchYearCategory } from './api'

const searchKey = 'sonyoonjoo-list'

const modelRef = reactive<Partial<SonYoonJoo>>({})
const current = ref<number>(1)
const pageSize = ref<number>(50)
const path = ref<string>()
const year = ref<number>()
// const threshold = 20

const { data, isFetching, error, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
  useInfiniteQuery<BaseList<SonYoonJoo>>({
    queryKey: [searchKey],
    queryFn: fetchList,
    getNextPageParam: (last) => {
      return {
        page: last.pagination.current + 1,
        pageSize: pageSize.value,
      }
    },
    // refetchOnWindowFocus: true,
    networkMode: 'offlineFirst',
    staleTime: 30 * 1000,
  })
const handler = () => {
  // console.log(e.target)
  //   const { scrollHeight, clientHeight, scrollTop } = e.target as HTMLDivElement
  //   if (scrollHeight - clientHeight - scrollTop <= threshold) {
  //     if (isFetching.value) return
  //     current.value++
  //   }
}

const onSubmit = () => {
  const data = toRaw(modelRef)
  year.value = data.year
  path.value = data.path
  current.value = 1
}

const handleReset = () => {
  year.value = undefined
  path.value = undefined
}

const { data: years } = useQuery<number[]>(['sonyoonjoo-year-category'], fetchYearCategory, {
  refetchOnWindowFocus: true,
  networkMode: 'offlineFirst',
})
// const realRecords = computed(() => {
//   console.log(data.value?.pages)
//   const records = data.value?.pages.reduce((prev: SonYoonJoo[], curr) => [...prev, ...curr.records], [])

//   return records
// })
const handleNext = (e: MouseEvent) => {
  e.stopPropagation()
  fetchNextPage()
}
</script>

<template>
  <a-form layout="inline">
    <a-row class="w-full py-2">
      <a-col :span="6">
        <a-form-item label="年份">
          <a-select v-model:value="modelRef.year">
            <a-select-option
              v-for="category in years"
              :key="category"
              :value="category"
            >
              {{ category }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item label="标题">
          <a-input v-model:value="modelRef.path" />
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item>
          <a-button
            type="primary"
            @click.prevent="onSubmit"
            htmlType="submit"
          >
            查找
          </a-button>
          <a-button
            style="margin-left: 10px"
            @click.prevent="handleReset"
          >
            重置
          </a-button>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
  <span v-if="isLoading">Loading...</span>
  <span v-else-if="isError">Error: {{ JSON.stringify(error) }}</span>
  <a-spin
    :spinning="isFetching"
    :delay="200"
    v-else-if="data"
  >
    <span v-if="isFetching && !isFetchingNextPage">Fetching...</span>
    <div
      class="max-h-[calc(100vh-90px)] overflow-auto pr-4"
      @scroll="handler"
    >
      <div class="columns-3xs h-full overflow-auto">
        <template
          v-for="group in data.pages"
          :key="group.pagination.current"
        >
          <div
            v-for="item in group.records"
            :key="item._id"
            class="mb-2"
          >
            <RouterLink
              :to="`/sonyoonjoo/${item._id}`"
              class="relative block"
            >
              <img
                :src="`http://localhost:4091${item.path}/${item.images?.[0]}`"
                :alt="`${item.path?.split('/').pop()}, ${item.year}, ${item.date}`"
                :title="`${item.path?.split('/').pop()}, ${item.year}, ${item.date}`"
                class=""
              />
              <p
                class="absolute bottom-0 mb-0 left-1/2 -translate-x-1/2 w-full text-white opacity-0 parent-hover:opacity-1"
              >
                {{ item.title }}
              </p>
            </RouterLink>
          </div>
        </template>
      </div>
    </div>
    <button
      @click="handleNext"
      :disabled="!hasNextPage || isFetchingNextPage"
    >
      <span v-if="isFetchingNextPage">Loading more...</span>
      <span v-else-if="hasNextPage">Load More</span>
      <span v-else>Nothing more to load</span>
    </button>
  </a-spin>
</template>
