<script setup lang="ts">
import HeavyComponent from './heavy-component.vue'
</script>

<template>
  <div class="container">
    <div
      v-for="n in 100"
      :key="n"
    >
      <HeavyComponent />
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
