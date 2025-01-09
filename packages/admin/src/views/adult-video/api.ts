import { useQuery } from '@tanstack/vue-query'
import { values } from 'lodash-es'
import type { Ref } from 'vue'
import type { BaseList, BaseResponse } from '@liutsing/types-utils'
import type { AdultVideo } from './type'
import { request } from '@/utils'

export const fetchListWithPagination = async (params: Params<AdultVideo>) => {
  return request<BaseList<AdultVideo>>({ url: '/videos/pages', params })
}

type QueryParams = Omit<Params<AdultVideo>, 'current'> & { current: Ref<number> }

export const usePaginationQuery = (params: QueryParams) => {
  const { current, ...rest } = params
  return useQuery(
    ['videos-pagination-key', params],
    () => fetchListWithPagination({ current: current.value, ...rest }),
    {
      refetchOnWindowFocus: true,
      networkMode: 'offlineFirst',
      keepPreviousData: true,
    }
  )
}

export const fetchById = async (id: string) => {
  return request<BaseResponse<AdultVideo>>({ url: '/videos/detail', params: { id } })
}

export const useDetailByIdQuery = (id: string) => {
  return useQuery(['videos-list-key'], () => fetchById(id), {
    refetchOnWindowFocus: true,
    networkMode: 'offlineFirst',
    select(data) {
      return values(data) as unknown as [AdultVideo[]]
    },
  })
}
