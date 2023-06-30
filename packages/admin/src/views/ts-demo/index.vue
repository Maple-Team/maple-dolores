<script lang="ts">
// 官方文档推荐通过TypeScript与组合式API来使用Vue，因为它提供了更简单、更高效和更可靠的类型推导。@https://vuejs.org/guide/typescript/options-api.html#typescript-with-options-api

import { defineComponent } from 'vue'
import type { PropType } from 'vue' // PropType工具类型来标记更复杂的prop类型
import TsDemo3Vue from '@/components/TsComposition.vue'

export default defineComponent({
  components: {
    TsDemo3Vue,
  },
  props: {
    name: {
      type: String,
    },
    people: {
      type: Object as PropType<{ name: string; age: number }>,
    },
  },
  // NOTE emits定义在组件顶部
  emits: {
    addBook(payload: { bookName: string }) {
      return payload.bookName.length > 1
    },
  },
  data() {
    return {
      msg: '12',
    }
  },
  computed: {
    computedProperty1(): string {
      // NOTE 计算属性最好显式的表明数据类型
      return `${this.msg}1`
    },
  },

  methods: {
    show(e: Event) {
      // this.$emit('addBook', 2)
      // this.$emit('addBook', {
      //     b: '',
      // })
      console.log(e.target as HTMLElement)
      this.$emit('addBook', {
        bookName: '333',
      })
    },
  },

  // setup() {
  //     return {
  //         msg: '1',
  //     }
  // },
})
</script>

<template>
  <span>{{ msg }}</span>
  <button @click="show">show</button>
  <TsDemo3Vue :obj="{ abbr: 'abbr', age: 8 }" />
</template>
