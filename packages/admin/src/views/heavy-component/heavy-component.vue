<script setup lang="ts">
import { onMounted } from 'vue'

const props = defineProps({ render: Number })
onMounted(() => {
  console.log(props.render, 'mounted')
})
</script>

<template>
  <div class="item-container">
    <div
      class="item"
      v-for="n in 5000"
      :key="n"
    ></div>
  </div>
</template>

<style scoped>
.item-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border: 3px solid #f40;
}
.item {
  width: 5px;
  height: 5px;
  background: #ccc;
  margin: 0.1em;
}
</style>
