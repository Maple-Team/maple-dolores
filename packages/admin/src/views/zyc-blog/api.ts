import type { BaseList } from '@liutsing/types-utils'
import type { QueryFunctionContext } from '@tanstack/vue-query'
import type { Blog } from './type'
import { request } from '@/utils'

export const fetchList = async (context: QueryFunctionContext) => {
  const { queryKey, signal } = context
  // @https://tanstack.com/query/latest/docs/framework/react/guides/query-cancellation#manual-cancellation
  console.log(queryKey)
  return request<BaseList<Blog>>({ url: '/zyc-blog', params: queryKey[1], signal })
}

export const fetchDetail = async (context: QueryFunctionContext) => {
  const { queryKey, signal } = context

  return request<Blog>({ url: `/zyc-blog/${queryKey[1] || ''}`, signal })
}
export const fetchPrevAndNext = async (context: QueryFunctionContext) => {
  const { queryKey, signal } = context

  return request<{
    prev?: Blog
    next?: Blog
  }>({ url: `/zyc-blog/nav/${queryKey[1] || ''}`, signal })
}

export const fetchCategory = async () => {
  return request<string[]>({ url: '/zyc-blog/category/all' })
}
