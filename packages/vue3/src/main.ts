import { createApp, h } from 'vue'
import './style.css'
import Antd, { message } from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
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

type VueInstance = ReturnType<typeof createApp>

const handleInit = (vueInstance: VueInstance, basename: string) => {
  vueInstance.use(newRouter(basename)).use(Antd).use(VueQueryPlugin, vueQueryPluginOptions).use(directives)
  vueInstance.config.globalProperties.$message = message
}

export const provider = vueBridge({
  rootComponent: App,
  handleInstance: (vueInstance, { basename }) => {
    handleInit(vueInstance, basename)
  },

  appOptions: ({ basename, dom, appName, props }) => {
    console.log(dom, appName, props)

    return {
      el: '#app',
      render: () => h(App),
      router: newRouter(basename),
    }
  },
})

// NOTE 非Garfish环境下
if (!window.__GARFISH__) {
  const vueInstance = createApp(App)
  handleInit(vueInstance, '/')
  vueInstance.mount(document.querySelector('#app')!)
}
