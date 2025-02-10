<script lang="ts" setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log('parent mounted!')
})
</script>

<template>
  <span>parent</span>
</template>
