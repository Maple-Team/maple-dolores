<template>
  <li>
    <a
      :href="`#/${type}`"
      :class="{ selected: visibility === type }"
    >
      {{ capitalize(type) }}
    </a>
  </li>
</template>

<script setup lang="ts">
import { FilterType } from './type.d'
import { PropType } from 'vue'
import { capitalize } from '@liutsing/utils'

defineProps({
  visibility: { type: String as PropType<FilterType>, required: true },
  type: { type: String as PropType<FilterType>, required: true },
})
</script>
