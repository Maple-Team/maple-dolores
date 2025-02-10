<script setup lang="ts">
import { onMounted } from 'vue'
import { request } from '@/utils'

onMounted(() => {
  request({
    url: '/api/proxy/abc/e?id=23432',
    noPrefix: true,
    // baseURL,
  }).catch(console.error)
})
</script>

<template>
  <h1>nginx proxy test</h1>
</template>
