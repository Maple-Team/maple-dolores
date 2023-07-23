<script lang="ts" setup>
import { ref } from 'vue'

const slides = ref([
  { key: 1, value: 1 },
  { key: 2, value: 2 },
  { key: 3, value: 3 },
])

const currentIndex = ref<number>(0)

const moveSide = (forward: number) => {
  currentIndex.value += forward

  // Wrap around to the beginning if reaching the end
  if (currentIndex.value >= slides.value.length) currentIndex.value = 0
  else if (currentIndex.value < 0) currentIndex.value = slides.value.length - 1
}
</script>

<template>
  <div>
    <div class="slider-container">
      <div
        class="slider"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div
          v-for="slide in slides"
          :key="slide.key"
          class="slide"
        >
          {{ slide.value }}
        </div>
      </div>
    </div>
    <div class="mt-3">
      <a-button
        type="primary"
        class="mr-3"
        @click="moveSide(-1)"
      >
        &lt;
      </a-button>
      <a-button
        type="primary"
        @click="moveSide(1)"
        >&gt;</a-button
      >
    </div>
  </div>
</template>

<style lang="less">
.slider-container {
  width: 300px;
  overflow: hidden;
  .slider {
    display: flex;
    flex-wrap: nowrap;
    transition: transform 0.5s ease-in-out;
    will-change: transform;
    .slide {
      width: 300px;
      height: 40px;
      flex-shrink: 0;
      line-height: 40px;
      text-align: center;
      background: #ff9500;
      border: 1px solid red;
      box-sizing: border-box;
      color: #fff;
    }
  }
}
</style>
