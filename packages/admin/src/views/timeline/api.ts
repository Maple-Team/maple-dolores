import { useQuery } from '@tanstack/vue-query'
import type { Ref } from 'vue'
import { unref } from 'vue'
import type { BaseList } from '@liutsing/types-utils'
import type { Timeline } from './type'
import { request } from '@/utils'

export const fetchList = async (params: Params<{ type?: Timeline['type'] }>) => {
  return request<BaseList<Timeline>>({ url: '/timeline', params })
}
const searchKey = 'timeline-list-key'

export const useListQuery = (params: {
  current: Ref<number>
  pageSize: Ref<number>
  type: Ref<Timeline['type'] | undefined>
}) => {
  return useQuery<BaseList<Timeline>>(
    [
      searchKey,
      {
        ...params,
      },
    ],
    () =>
      fetchList({
        current: unref(params.current),
        pageSize: unref(params.pageSize),
        type: unref(params.type),
      }),
    {
      refetchOnWindowFocus: true,
      networkMode: 'offlineFirst',
    }
  )
}
