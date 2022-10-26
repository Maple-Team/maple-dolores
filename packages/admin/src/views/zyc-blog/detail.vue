<template>
  <template v-if="id">
    <div v-if="!isLoading">
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
      />
      <ul>
        <li v-if="prev">
          <span @click="onPrev">上一篇: {{ prev.title }}</span>
        </li>
        <li v-if="next">
          <span @click="onNext">下一篇: {{ next.title }}</span>
        </li>
      </ul>
    </div>
    <a-skeleton v-else />
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
<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { fetchDetail, fetchPrevAndNext } from '../zyc-blog/api'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, onUnmounted, onUpdated, ref, watch } from 'vue'
import { Blog } from './type'

const route = useRoute()
const router = useRouter()
const isLoading = ref<boolean>(false)
const params = route.params
const id = params.id as string

console.log(id, params, '==params==')

// watch(
//   () => route,
//   (n) => {
//     console.log(n, '==route==')
//   },
//   { deep: true, immediate: true }
// )
// watch(
//   () => router,
//   (n) => {
//     console.log(n, '==router==')
//   }
// )
// const instance = getCurrentInstance()

// const { isLoading, data: record } = useQuery(['zyc-blog-detail'], () => fetchDetail(id.value))

const record = ref<Blog>()
const prev = ref<Blog>()
const next = ref<Blog>()
onMounted(() => {
  console.log('mounted')
  window.addEventListener(
    'error',
    (e) => {
      const image = e.target as HTMLImageElement | null
      if (image) {
        const src = image.getAttribute('original')
        if (src) {
          image.setAttribute('src', src.replace('http://image.sciencenet.cn', 'http://localhost:4091/zyc-images'))
        }
      }
    },
    true
  )
  fetchPrevAndNext(id).then((res) => {
    prev.value = res?.prev
    next.value = res?.next
  })
  onFetchInfo(id)
})
const onPrev = () => {
  console.log(prev)
  const _id = prev.value?._id
  router
    .push({
      path: `/zyc-blog/${_id}`,
    })
    .then((e) => {
      console.log(e, 'onPrev')
      _id &&
        fetchDetail(_id)
          .then((res) => {
            record.value = res
          })
          .finally(() => {
            isLoading.value = false
          })
    })
}
const onNext = () => {
  console.log(next)
  const _id = next.value?._id
  router
    .push({
      path: `/zyc-blog/${_id}`,
    })
    .then((e) => {
      console.log(e, 'onNext')
      _id &&
        fetchDetail(_id)
          .then((res) => {
            record.value = res
          })
          .finally(() => {
            isLoading.value = false
          })
    })
}
onUnmounted(() => {
  window.removeEventListener('error', () => {})
})

const onFetchInfo = (id: string) => {
  isLoading.value = true
  fetchDetail(id)
    .then((res) => {
      record.value = res
    })
    .finally(() => {
      isLoading.value = false
    })
}
onUpdated(() => {
  console.log('updated')
  fetchPrevAndNext(id).then((res) => {
    prev.value = res?.prev
    next.value = res?.next
  })
})
</script>
