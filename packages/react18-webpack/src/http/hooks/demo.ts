import { useQuery } from '@tanstack/react-query'
import { instance } from '../axios'

export const useDataPermission = (id?: string) => {
  return useQuery(['data-permission-query-key', id], () => instance('/users/data-permission', { params: { id } }))
}
