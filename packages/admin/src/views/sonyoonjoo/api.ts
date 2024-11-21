import type { BaseList } from '@liutsing/types-utils'
import type { SonYoonJoo } from './type'
import { request } from '@/utils'

export const fetchList = async ({ pageParam }: AnyToFix) => {
  console.log(pageParam, 'queryKey')
  return request<BaseList<SonYoonJoo>>({ url: '/sonyoonjoo', params: pageParam })
}

export const fetchDetail = async (id?: string) => {
  return request<SonYoonJoo>({ url: `/sonyoonjoo/${id!}` })
}
export const fetchPrevAndNext = async (id?: string) => {
  return request<{
    prev?: SonYoonJoo
    next?: SonYoonJoo
  }>({ url: `/sonyoonjoo/nav/${id!}` })
}

export const fetchCategory = async () => {
  return request<SonYoonJoo[]>({ url: '/sonyoonjoo/category' })
}

export const fetchYearCategory = async () => {
  return request<number[]>({ url: '/sonyoonjoo/category/years' })
}
