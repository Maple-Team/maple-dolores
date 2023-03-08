import { request } from '@/utils'
import type { Meitu } from './type'

export const fetchList = async (params: AnyToFix) => {
  return request<BaseList<Meitu>>({ url: '/meitulu', params })
}

export const fetchDetail = async (id?: string) => {
  return request<Meitu>({ url: `/meitulu/${id}` })
}
export const fetchPrevAndNext = async (id?: string) => {
  return request<{
    prev?: Meitu
    next?: Meitu
  }>({ url: `/meitulu/nav/${id}` })
}

export const fetchTags = async () => {
  return request<string[]>({ url: `/meitulu/tags` })
}
