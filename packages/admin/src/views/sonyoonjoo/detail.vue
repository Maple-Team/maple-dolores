<template>
  <template v-if="id">
    <a-spin
      :spinning="isLoading"
      :delay="500"
    >
      <h1 class="p-2">
        {{ record?.title }}
        <template v-if="record?.isRecommend">
          <a-tag color="red">精选</a-tag>
        </template>
      </h1>
      <p>日期: {{ record?.date }} 阅读量: {{ record?.reads }}</p>
      <div class="max-h-[640px] overflow-auto">
        <img
          v-for="img in record?.images"
          :key="img"
          :src="`http://localhost:4091${record?.path}/${img}`"
        />
      </div>
      <a-spin
        :spinning="navLoading"
        delay="500"
      >
        <ul>
          <li
            v-if="navRecord?.prev"
            class="cursor-pointer"
          >
            <span @click="onPrev(navRecord?.prev?._id)">上一篇: {{ navRecord?.prev.title }}</span>
          </li>
          <li
            v-if="navRecord?.next"
            class="cursor-pointer"
          >
            <span @click="onNext(navRecord?.next?._id)">下一篇: {{ navRecord?.next.title }}</span>
          </li>
        </ul>
      </a-spin>
    </a-spin>
  </template>
  <a-result
    status="404"
    title="404"
    sub-title="Sorry, the page you visited does not exist."
    v-else
  >
    <template #extra>
      <a-button
        type="primary"
        @click="router.push({ path: '/sonyoonjoo' })"
      >
        Back Home
      </a-button>
    </template>
  </a-result>
</template>
<script setup lang="ts">
import { fetchDetail, fetchPrevAndNext } from '../sonyoonjoo/api'
import { useRoute, useRouter } from 'vue-router'
import { ref, toRaw, unref } from 'vue'
import { SonYoonJoo } from './type'
import { useQuery } from '@tanstack/vue-query'

const route = useRoute()
const router = useRouter()

const params = route.params

const id = ref<string>()

id.value = params.id as string
// key值关键
const { isLoading, data: record } = useQuery<SonYoonJoo>(
  ['sonyoonjoo-detail', toRaw(id)],
  () => fetchDetail(unref(id)),
  {
    enabled: !!unref(id),
    select: (data) => {
      return { ...data, title: data.path.split('/').pop() }
    },
  }
)
// key值关键
const { isLoading: navLoading, data: navRecord } = useQuery<{ prev?: SonYoonJoo; next?: SonYoonJoo }>(
  ['sonyoonjoo-nav', toRaw(id)],
  () => fetchPrevAndNext(unref(id)),
  {
    enabled: !!unref(id),
    select: (data) => {
      return {
        prev: data.prev
          ? {
              ...data.prev,
              title: data.prev.path.split('/').pop(),
            }
          : undefined,
        next: data.next
          ? {
              ...data.next,
              title: data.next.path.split('/').pop(),
            }
          : undefined,
      }
    },
  }
)

const onPrev = (pid?: string) => {
  router
    .push({
      path: `/sonyoonjoo/${pid}`,
    })
    .then(() => {
      id.value = pid
    })
}
const onNext = (nid?: string) => {
  router
    .push({
      path: `/sonyoonjoo/${nid}`,
    })
    .then(() => {
      id.value = nid
    })
}
</script>
