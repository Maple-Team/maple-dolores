import type { Video } from '../type'
import { request } from '@/services'
import { QueryFunctionContext, useQuery } from '@tanstack/react-query'

export const fetchDetail = async ({ queryKey }: QueryFunctionContext) => {
  return request<Video>({ url: `/videos/${queryKey[1]}` })
}

const videoDetailQueryKey = 'videoDetailQueryKey'

export const useVideoDetail = (code?: string | string[]) =>
  useQuery({
    queryKey: [videoDetailQueryKey, code],
    queryFn: fetchDetail,
    networkMode: 'offlineFirst',
    staleTime: 30 * 1000,
    enabled: !!code,
  })
