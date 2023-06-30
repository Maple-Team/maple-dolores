<script setup lang="ts">
import { ref } from 'vue'

const data = ref<string>('ref')
</script>

<template>
  <div>{{ data }}</div>
</template>
