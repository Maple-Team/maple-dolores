import { request } from '@/utils'
import type { SonYoonJoo } from './type'

export const fetchList = async (params: AnyToFix) => {
  return request<BaseList<SonYoonJoo>>({ url: '/sonyoonjoo', params })
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
  return request<number[]>({ url: `/sonyoonjoo/category/years` })
}
