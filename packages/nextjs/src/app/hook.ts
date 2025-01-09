import type { BaseList } from '@liutsing/types-utils'
import type { Video } from './type'
import { request } from '@/services'
import { QueryFunctionContext, useQuery } from '@tanstack/react-query'

export const fetchList = async ({ queryKey }: QueryFunctionContext) => {
  return request<BaseList<Video>>({ url: '/videos/pages', params: queryKey[1] })
}

const videoListQueryKey = 'videoListQueryKey'

export const useSearchList = () =>
  useQuery({
    queryKey: [videoListQueryKey],
    queryFn: fetchList,
    networkMode: 'offlineFirst',
    staleTime: 30 * 1000,
  })
