<script setup lang="ts">
import type { PropType } from 'vue'
import { capitalize } from '@liutsing/utils'
import type { FilterType } from './type'

defineProps({
  visibility: { type: String as PropType<FilterType>, required: true },
})

const filters: FilterType[] = ['all', 'active', 'completed']
</script>

<template>
  <ul class="filters">
    <li
      v-for="item in filters"
      :key="item"
      v-LazyDirective="'123'"
    >
      <a
        :href="`#/${item}`"
        :class="{ selected: visibility === item }"
      >
        {{ capitalize(item) }}
      </a>
    </li>
  </ul>
</template>

<style lang="less" scoped>
.filters {
  margin: 0;
  padding: 0;
  list-style: none;
  position: absolute;
  right: 0;
  left: 0;
  li {
    display: inline;
    a {
      color: inherit;
      margin: 3px;
      padding: 3px 7px;
      text-decoration: none;
      border: 1px solid transparent;
      border-radius: 3px;
      &:hover {
        border-color: rgba(175, 47, 47, 0.1);
      }
      &.selected {
        border-color: rgba(175, 47, 47, 0.2);
      }
    }
  }
}
</style>
