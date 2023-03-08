<template>
  <a-form :layout="'inline'">
    <a-row class="w-full py-2">
      <a-col :span="6">
        <a-form-item label="年份">
          <a-select v-model:value="modelRef.year">
            <a-select-option
              v-for="category in categories"
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
            >重置</a-button
          >
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-select v-model:value="current">
          <a-select-option
            v-for="index in Array.from({ length: data?.pagination.total || 0 }, (_, i) => i + 1)"
            :key="index"
            :value="index"
          >
            第{{ index }}页
          </a-select-option>
        </a-select>
      </a-col>
    </a-row>
  </a-form>
  <template v-if="error"> {{ JSON.stringify(error) }}</template>
  <template v-else>
    <div class="max-h-[700px] overflow-auto h-full">
      <div ref="containerRef">
        <a-row :gutter="[8, 8]">
          <a-col
            :span="4"
            v-for="item in data?.records"
            :key="item._id"
          >
            <router-link :to="`/sonyoonjoo/${item._id}`">
              <img
                :src="`http://localhost:4091${item.path}/${item.images?.[0]}`"
                :alt="`${item.title}, ${item.year}, ${item.date}`"
                :title="`${item.title}, ${item.year}, ${item.date}`"
                class="w-[200px]"
              />
              <p>{{ item.title }}</p>
            </router-link>
          </a-col>
        </a-row>
      </div>
    </div>
  </template>
</template>
<script setup lang="ts">
import { ref, reactive, toRaw, onMounted, onUnmounted } from 'vue'
import { SonYoonJoo } from './type'
import { RouterLink, useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import { fetchCategory, fetchList } from './api'

const searchKey = 'sonyoonjoo-list'

const modelRef = reactive<Partial<SonYoonJoo>>({})
const { query } = useRoute()
const { page } = query as { page?: number }
const current = ref<number>(page || 1)
const pageSize = ref<number>(50)
const path = ref<string>()
const year = ref<number>()

const handler = (e: Event) => {
  console.log(e, 'e')
}
const containerRef = ref(null)
onMounted(() => {
  const ele = containerRef.value as unknown as HTMLDivElement
  console.log(ele, ele.scrollHeight)
  ele.addEventListener('scroll', handler)
})
onUnmounted(() => {
  const ele = containerRef.value as unknown as HTMLDivElement
  ele?.removeEventListener('scroll', handler)
})

const { isLoading, data, error } = useQuery<BaseList<SonYoonJoo>>(
  [
    searchKey,
    {
      current: toRaw(current),
      pageSize: toRaw(pageSize),
      path: toRaw(path),
      year: toRaw(year),
    },
  ],
  fetchList,
  {
    refetchOnWindowFocus: true,
    select: (data) => {
      return {
        ...data,
        records: data.records.map(({ path, ...rest }) => ({
          ...rest,
          path,
          title: path.split('/').pop()?.split('_').pop(),
        })),
      }
    },
    networkMode: 'offlineFirst',
  }
)
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

const { data: categories } = useQuery<number[]>(['sonyoonjoo-category'], fetchCategory, {
  refetchOnWindowFocus: true,
  networkMode: 'offlineFirst',
})
</script>
