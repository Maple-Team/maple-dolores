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
      <p>
        机构: <a-tag color="blue">{{ record?.orgName }}</a-tag>
      </p>
      <p>
        模特:
        <a-tag
          v-for="modelName in record?.modelName"
          :key="modelName"
          color="red"
        >
          {{ modelName }}</a-tag
        >
      </p>
      <p>
        标签:
        <a-tag
          v-for="tag in record?.tags"
          :key="tag"
          color="green"
        >
          {{ tag }}</a-tag
        >
      </p>
      <div class="max-h-[640px] overflow-auto">
        <img
          v-for="img in record?.images.filter((file) => !file.startsWith('.'))"
          :key="img"
          :src="`http://localhost:4091/ins/Meitulu/${record?.title}/${img}`"
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
import { fetchDetail, fetchPrevAndNext } from './api'
import { useRoute, useRouter } from 'vue-router'
import { ref, toRaw, unref } from 'vue'
import { Meitu } from './type'
import { useQuery } from '@tanstack/vue-query'

const route = useRoute()
const router = useRouter()

const params = route.params

const id = ref<string>()

id.value = params.id as string
// key值关键
const { isLoading, data: record } = useQuery<Meitu>(['xiuren-detail', toRaw(id)], () => fetchDetail(unref(id)), {
  enabled: !!unref(id),
  networkMode: 'offlineFirst',
})
// key值关键
const { isLoading: navLoading, data: navRecord } = useQuery<{ prev?: Meitu; next?: Meitu }>(
  ['xiuren-nav', toRaw(id)],
  () => fetchPrevAndNext(unref(id)),
  {
    enabled: !!unref(id),
    networkMode: 'offlineFirst',
  }
)

const onPrev = (pid?: string) => {
  router
    .push({
      path: `/xiuren/${pid}`,
    })
    .then(() => {
      id.value = pid
    })
}
const onNext = (nid?: string) => {
  router
    .push({
      path: `/xiuren/${nid}`,
    })
    .then(() => {
      id.value = nid
    })
}
</script>
