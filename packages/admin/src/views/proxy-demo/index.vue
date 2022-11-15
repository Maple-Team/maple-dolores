<template>
  <h1>nginx proxy test</h1>
</template>
<script setup lang="ts">
import { request } from '@/utils'
import { onMounted } from 'vue'
// const baseURL = 'http://localhost:9020'
onMounted(() => {
  // request({
  //   url: '/proxy/a',
  //   // baseURL,
  // }).catch(console.error)
  // request({
  //   url: '/proxy/abc/d',
  //   // baseURL,
  // }).catch(console.error)
  request({
    url: '/proxy/abc/e?id=23432',
    // baseURL,
  }).catch(console.error)
  request({
    url: '/bpi/proxy/abc/e?id=23432',
    // @ts-ignore
    noPrex: true,
    // baseURL,
  }).catch(console.error)
})
</script>
