import type { BaseList, BaseParams } from '@liutsing/types-utils'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { Timeline } from './type'
import { instance } from '@/http'

export const queryKey = 'list-data-query-key'

export const useFetchTimeLineList = (params?: BaseParams<Partial<Timeline>>) => {
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: () =>
      instance<AnyToFix, BaseList<Timeline>>('/timelines', {
        params,
      }),
    enabled: !!params,
    // NOTE 保持之前的数据
    placeholderData: keepPreviousData,
  })
}

export const deleteById = (id: string) => {
  return instance.delete(`/timelines/${id}`)
}

export const updateById = (id: string, data: Partial<Timeline>) => {
  return instance.put(`/timelines/${id}`, data)
}

export const create = (data: Partial<Timeline>) => {
  return instance.post('/timelines', data)
}

const findById = (id?: string) => {
  return instance.get(`/timelines/${id}`)
}

export const useFetchTimeLine = (id?: string) => {
  return useQuery({
    queryKey: ['find-id-query-key', id],
    queryFn: () => findById(id),
    enabled: !!id,
  })
}
