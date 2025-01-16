import { instance } from '@/http'
import { BaseParams, BaseList } from '@liutsing/types-utils'
import { useQuery } from '@tanstack/react-query'
import { Timeline } from './type'

export const queryKey = 'list-data-query-key'

export const useFetchTimeLineList = (params?: BaseParams<Partial<Timeline>>) => {
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: () =>
      instance<AnyToFix, BaseList<Timeline>>('/timeline', {
        params,
      }),
  })
}
