import type { BaseList } from '@liutsing/types-utils'
import type { Blog } from './type'
import { request } from '@/utils'

// TODO 待处理
// @ts-expect-error: xx
export const fetchList = async ({ queryKey }) => {
  return request<BaseList<Blog>>({ url: '/zyc-blog', params: queryKey[1] })
}

export const fetchDetail = async (id?: string) => {
  return request<Blog>({ url: `/zyc-blog/${id || ''}` })
}
export const fetchPrevAndNext = async (id?: string) => {
  return request<{
    prev?: Blog
    next?: Blog
  }>({ url: `/zyc-blog/nav/${id || ''}` })
}

export const fetchCategory = async () => {
  return request<string[]>({ url: '/zyc-blog/category/all' })
}
