import { request } from '@/utils'
import type { Blog } from './type'

//@ts-ignore
export const fetchList = async ({ queryKey }) => {
  console.log(queryKey[1], '==queryKey==')
  return request<BaseList<Blog>>({ url: '/zyc-blog', params: queryKey[1] })
}

export const fetchDetail = async (id: string) => {
  if (!id || id === '0') return
  return request<Blog>({ url: `/zyc-blog/${id}` })
}
export const fetchPrevAndNext = async (id: string) => {
  if (!id || id === '0') return
  return request<{
    prev?: Blog
    next?: Blog
  }>({ url: `/zyc-blog/nav/${id}` })
}

export const fetchCategory = async () => {
  return request<string[]>({ url: `/zyc-blog/category/all` }).then((data) => {
    return Array.from(new Set(data.map((_) => _.replace(/\|/, ''))))
  })
}
