import type { Actress } from '../type'
import { request } from '@/services'
import { BaseList } from '@liutsing/types-utils'
import { useQuery } from '@tanstack/react-query'

export const fetchActresses = async () => {
  return request<BaseList<Actress>>({ url: `/videos/actresses` })
}

const videoActressesQueryKey = 'videoActressesQueryKey'

export const useActressList = () =>
  useQuery({
    queryKey: [videoActressesQueryKey],
    queryFn: fetchActresses,
    networkMode: 'offlineFirst',
    staleTime: 30 * 1000,
  })

export const fetchExistActresses = async () => {
  return request<Actress['name'][]>({ url: `/videos/distinct-actresses` })
}

const videoExistActressesQueryKey = 'videoExistActressesQueryKey'

export const useExistActressList = () =>
  useQuery({
    queryKey: [videoExistActressesQueryKey],
    queryFn: fetchExistActresses,
    networkMode: 'offlineFirst',
    staleTime: 30 * 1000,
  })
