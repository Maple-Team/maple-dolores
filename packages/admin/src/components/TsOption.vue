<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: {
    addBook(payload: { bookName: string }) {
      return payload.bookName.length > 1
    },
  },
  setup(props, { emit }) {
    emit('addBook', { bookName: 'test name' })
  },
  methods: {
    test() {
      // this.$emit('addBook', 2)
      // this.$emit('addBook', { bookName: 3 })
      this.$emit('addBook', {
        bookName: '222',
      })
      this.$translate('a')
    },
  },
})
</script>

<template>
  <button @click="test">test</button>
</template>
