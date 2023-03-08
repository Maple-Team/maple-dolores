import { Directive } from 'vue'

// 图片加载工具函数
// 加载队列
// 缓存
// ----
// 指令清理
//
/**
 * 使用动态创建Image来处理图片资源的预加载
 * 先请求到资源到内存中，再在需要使用的地方直接使用
 * 劫持图片请求，做到图片加载可控
 */
class _ImageLoader {
  // private loadingSrc: string
  // private errorSrc: string
  // private src: string
}

// resizerObserver
// intersectionObserver

const LazyDirective: Directive<HTMLImageElement, string> = {
  created: (el, binding) => {
    console.log('[created]', el, binding)
  },
  beforeMount: (el, binding) => {
    console.log('[beforeMount]', el, binding)
  },
  mounted: (el, binding) => {
    console.log('[mounted]', el, binding)
  },
  beforeUpdate: (el, binding) => {
    console.log('[beforeUpdate]', el, binding)
  },
  updated: (el, binding, vnode, previousVnode) => {
    // 指令值变更，需要重新加载请求
    console.log('[updated]', el, binding, vnode, previousVnode)
  },
  beforeUnmount: (el, binding) => {
    console.log('[beforeUnmount]', el, binding)
  },
  unmounted: (el, binding) => {
    console.log('[unmounted]', el, binding)
  },
}

export default LazyDirective
