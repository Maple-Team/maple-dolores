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
  {
    path: '/sonyoonjoo/:id',
    component: () => import('@/views/sonyoonjoo/detail.vue'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/xiuren/:id',
    component: () => import('@/views/xiuren/detail.vue'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/video/:id',
    component: () => import('@/views/video/detail.vue'),
    meta: {
      hidden: true,
    },
  },
]
