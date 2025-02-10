import { useQuery } from '@tanstack/vue-query'
import { values } from 'lodash-es'
import type { Ref } from 'vue'
import type { BaseList, BaseParams, BaseResponse } from '@liutsing/types-utils'
import type { LzzModel, LzzResponse } from './type'
import { request } from '@/utils'

export const fetchList = async () => {
  return request<BaseResponse<LzzResponse>>({ url: '/lzz/all' })
}

export const useListQuery = () => {
  return useQuery({
    queryKey: ['lzz-list-key'],
    queryFn: fetchList,
    refetchOnWindowFocus: true,
    networkMode: 'offlineFirst',
    select(data) {
      return values(data) as unknown as [LzzModel[]]
    },
  })
}
export const fetchListWithPagination = async (params: BaseParams<LzzModel>) => {
  return request<BaseList<LzzModel>>({ url: '/lzz/pages', params })
}
type NewParams = Omit<BaseParams<LzzModel>, 'current'> & { current: Ref<number> }
export const usePaginationQuery = (params: NewParams) => {
  const { current, ...rest } = params
  return useQuery({
    queryKey: ['lzz-list-key'],
    queryFn: () => fetchListWithPagination({ current: current.value, ...rest }),
  })
}
export const fetchById = async (id: string) => {
  return request<BaseResponse<LzzModel>>({ url: '/lzz/detail', params: { id } })
}

export const useDetailByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ['lzz-detail-key', id],
    queryFn: () => fetchById(id),
    select(data) {
      return values(data) as unknown as [LzzModel]
    },
  })
}
