import { h } from 'vue'
import { dynamicRoutes } from '@/utils'

export const routes = [
  {
    path: '/',
    component: {
      render: () => h('div', ['home']),
    },
  },
  ...dynamicRoutes,
  {
    path: '/zyc-blog/:id',
    component: () => import('@/views/zyc-blog/detail.vue'),
    meta: {
      hidden: true,
    },
  },
]
