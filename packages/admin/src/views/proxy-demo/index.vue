<template>
  <h1>nginx proxy test</h1>
</template>
<script setup lang="ts">
import { request } from '@/utils'
import { onMounted } from 'vue'
onMounted(() => {
  request({
    url: '/api/proxy/abc/e?id=23432',
    noPrefix: true,
    // baseURL,
  }).catch(console.error)
})
</script>
