const modules = import.meta.glob('@/views/**/index.vue')

let _links: string[] = []
export const dynamicRoutes = Object.keys(modules).map((module) => {
  const path = module.split('/')[3]
  _links.push(path)
  return {
    path: `/${path}`,
    component: modules[module],
  }
})

export const links = [..._links]

export const routerMap: {
  [key: string]: any
} = {
  'zyc-blog': { name: '曾咏春博文' },
  sonyoonjoo: { name: 'SonYoonJoo' },
  xiuren: { name: 'Xiuren' },
}
