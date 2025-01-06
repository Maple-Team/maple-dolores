import { createApp, h } from 'vue'
import './style.css'
import Antd, { message } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import { vueBridge } from '@garfish/bridge-vue-v3'
import { createRouter, createWebHistory } from 'vue-router'
import type { VueQueryPluginOptions } from '@tanstack/vue-query'
import { VueQueryPlugin } from '@tanstack/vue-query'

import directives from './directives'
import App from './App.vue'
import { routes } from './router'

function newRouter(basename: string) {
  const router = createRouter({
    history: createWebHistory(basename),
    routes,
    scrollBehavior() {
      return {
        top: 0,
      }
    },
  })
  return router
}

const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        staleTime: 3600,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchIntervalInBackground: true,
        networkMode: 'offlineFirst',
      },
    },
  },
}

export const provider = vueBridge({
  rootComponent: App,
  handleInstance: (vueInstance, { basename }) => {
    vueInstance.use(newRouter(basename)).use(Antd).use(VueQueryPlugin, vueQueryPluginOptions).use(directives)
    vueInstance.config.globalProperties.$message = message
  },
  appOptions: () => ({
    el: '#app',
    render: () => h(App),
  }),
})

if (!window.__GARFISH__) {
  // 非微前端环境直接运行
  const vueInstance = createApp(App)
  vueInstance.config.globalProperties.$message = message
  vueInstance.use(newRouter('/')).use(Antd).use(VueQueryPlugin).use(directives)
  vueInstance.mount(document.querySelector('#app')!)
}
