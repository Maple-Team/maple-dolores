const modules = import.meta.glob('@/views/**/index.vue')

const linksArr: string[] = []
export const dynamicRoutes = Object.keys(modules).map((module) => {
  const path = module.split('/')[3]
  linksArr.push(path)
  return {
    path: `/${path}`,
    component: modules[module],
  }
})

export const links = [...linksArr]

export const routerMap: {
  [key: string]: { name: string }
} = {
  'zyc-blog': { name: '曾咏春博文' },
  sonyoonjoo: { name: 'SonYoonJoo' },
  xiuren: { name: 'Xiuren' },
  timeline: { name: 'TimeLine' },
}
