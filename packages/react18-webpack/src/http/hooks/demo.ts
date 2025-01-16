import { useQuery } from '@tanstack/react-query'
import { instance } from '../axios'

export const useDataPermission = (id?: string) => {
  return useQuery({
    queryKey: ['data-permission-query-key', id],
    queryFn: () => instance('/users/data-permission', { params: { id } }),
  })
}
