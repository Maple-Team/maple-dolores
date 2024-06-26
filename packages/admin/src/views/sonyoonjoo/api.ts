import type { BaseList } from '@liutsing/types-utils'
import type { SonYoonJoo } from './type'
import { request } from '@/utils'

export const fetchList = async ({ queryKey }: AnyToFix) => {
  return request<BaseList<SonYoonJoo>>({ url: '/sonyoonjoo', params: queryKey[1] })
}

export const fetchDetail = async (id?: string) => {
  return request<SonYoonJoo>({ url: `/sonyoonjoo/${id}` })
}
export const fetchPrevAndNext = async (id?: string) => {
  return request<{
    prev?: SonYoonJoo
    next?: SonYoonJoo
  }>({ url: `/sonyoonjoo/nav/${id}` })
}

export const fetchCategory = async () => {
  return request<number[]>({ url: '/sonyoonjoo/category/years' })
}
