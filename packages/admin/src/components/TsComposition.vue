<script lang="ts" setup>
import { type InjectionKey, type Ref, computed, inject, onMounted, provide, reactive, ref } from 'vue'
import type Modal from './modal.vue'
// import type { A } from './a'
interface A {
  name?: string
  obj: {
    age: number
    abbr: string
  }
}
const { name = '1234' } = defineProps<A>()

// runtime
// const emit1 = defineEmits(['change', 'update'])
// type-based
const _emit2 = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
  (e: 'test', obj: { str: string }): void
}>()

// ref
const aa = ref(123)
aa.value = 234

const year: Ref<string | number> = ref('1988')
console.log(year.value)

year.value = 2022

// Reactive
const _data1 = reactive({ a: 1 })
// 不推荐使用类型参数
const data2: { c: number; a?: string | number } = reactive({ c: 1 })
console.log(data2.c)

// Computed
const count = ref(0)
// 支持泛型参数指定返回类型
const computed1 = computed<number>(() => count.value * 2)
console.log(computed1.value)

// 事件处理函数标注类型
function test(e: AnyToFix) {
  console.log(e.target, '=====')
}

// 为 provide / inject 标注类型
const key = Symbol() as InjectionKey<string>
provide(key, '22')
const _foo = inject(key, '234')
const _foo1 = inject<string>('23')

// 为模板引用标注类型
const el = ref<HTMLInputElement | null>(null)
onMounted(() => {
  el.value?.focus()
})

// 为组件模板引用标注类型
const modal = ref<InstanceType<typeof Modal> | null>(null)
const _openModal = () => {
  modal.value?.open()
}
</script>

<template>
  <button @click="test">{{ name }}</button>
  <span>{{ obj.abbr }}{{ obj.age }}</span>
  <input ref="el" />
</template>
