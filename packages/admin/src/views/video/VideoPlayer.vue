<template>
  <video
    ref="playerRef"
    class="video-js"
  ></video>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, onUnmounted, PropType } from 'vue'
import Videojs from 'video.js'
import Player from 'video.js/dist/types/player'
import { PlayerOptions } from './type'
import 'video.js/dist/video-js.min.css'

const props = defineProps({
  options: { type: Object as PropType<PlayerOptions> },
})
const playerRef = ref(null)
let player: Player | null = null

onMounted(() => {
  if (playerRef.value && !player) {
    player = Videojs(playerRef.value, {
      ...props.options,
    } as PlayerOptions)
  }
})
watch(
  () => props.options?.sources,
  () => {
    console.log(props.options?.sources[0].src)
    if (player) {
      player.src(props.options?.sources[0].src)
    }
  },
  { deep: true }
)
onUnmounted(() => {
  player && player.dispose()
})
</script>
