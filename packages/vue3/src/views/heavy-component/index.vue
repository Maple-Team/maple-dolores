<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import HeavyComponent from './heavy-component.vue'

const renderTime = ref(0)
const raf = ref<number>()

onMounted(() => {
  const draw = () => {
    renderTime.value++
    raf.value = requestAnimationFrame(draw)
  }
  raf.value = requestAnimationFrame(draw)
})
onUnmounted(() => {
  if (raf.value) cancelAnimationFrame(raf.value)
})
watch(renderTime, (n) => {
  console.log(`render time: ${n}`)
})
</script>

<template>
  <div class="container">
    <div
      v-for="n in 21"
      :key="n"
    >
      <HeavyComponent
        v-if="n < renderTime"
        :render="n"
      />
      <!-- <HeavyComponent /> -->
    </div>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1em;
}
</style>
