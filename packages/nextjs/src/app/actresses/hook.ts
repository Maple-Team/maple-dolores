import type { Actress } from '../type'
import { request } from '@/services'
import { useQuery } from '@tanstack/react-query'

export const fetchActresses = async () => {
  return request<Actress[]>({ url: `/videos/actresses` })
}

const videoActressesQueryKey = 'videoActressesQueryKey'

export const useActressList = () =>
  useQuery({
    queryKey: [videoActressesQueryKey],
    queryFn: fetchActresses,
    networkMode: 'offlineFirst',
    staleTime: 30 * 1000,
  })
