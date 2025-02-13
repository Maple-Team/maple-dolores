import type { BaseList, BaseParams } from '@liutsing/types-utils'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { Timeline } from './type'
import { instance } from '@/http'

export const queryKey = 'list-data-query-key'

export const useFetchTimeLineList = (params?: BaseParams<Partial<Timeline>>) => {
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: () =>
      instance<AnyToFix, BaseList<Timeline>>('/timeline', {
        params,
      }),
    enabled: !!params,
    // NOTE 保持之前的数据
    placeholderData: keepPreviousData,
  })
}

export const deleteById = (id: string) => {
  return instance.delete(`/timeline/${id}`)
}
