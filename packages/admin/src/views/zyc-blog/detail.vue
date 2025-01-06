<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted, onUnmounted, ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { fetchDetail, fetchPrevAndNext } from '../zyc-blog/api'
import type { Blog } from './type'

const route = useRoute()
const router = useRouter()

const params = route.params

const id = ref<string>()

id.value = params.id as string

const { isLoading, data: record } = useQuery<Blog>({
  queryKey: ['zyc-blog-detail', id],
  queryFn: fetchDetail,
  enabled: !!id.value,
  networkMode: 'offlineFirst',
})

const { isLoading: navLoading, data: navRecord } = useQuery<{ prev?: Blog; next?: Blog }>({
  queryKey: ['zyc-blog-nav', id],
  queryFn: fetchPrevAndNext,
  enabled: !!id.value,
  networkMode: 'offlineFirst',
})

onMounted(() => {
  // window.addEventListener(
  //   'error',
  //   (e) => {
  //     const image = e.target as HTMLImageElement | null
  //     if (image) {
  //       const src = image.getAttribute('original')
  //       if (src) {
  //         image.setAttribute('src', src.replace('http://image.sciencenet.cn', 'http://localhost:4091/zyc-images'))
  //       }
  //     }
  //   },
  //   true
  // )
})
onUnmounted(() => {
  //
})
const onPrev = (pid?: string) => {
  router
    .push({
      path: `/zyc-blog/${pid}`,
    })
    .then(() => {
      id.value = pid
    })
}
const onNext = (nid?: string) => {
  router
    .push({
      path: `/zyc-blog/${nid}`,
    })
    .then(() => {
      id.value = nid
    })
}
</script>

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
      <p>发表日期: {{ record?.date }} 阅读量: {{ record?.reads }}</p>
      <article
        class="overflow-auto max-h-[calc(100vh-150px)]"
        v-html="record?.content?.replace(/转载本文请联.*\n*.*/gm, '')"
      ></article>
      <a-spin
        :spinning="navLoading"
        :delay="500"
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
        @click="router.push({ path: '/zyc-blog' })"
      >
        Back Home
      </a-button>
    </template>
  </a-result>
</template>
