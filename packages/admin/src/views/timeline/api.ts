import { request } from '@/utils'
import type { Timeline } from './type'

export const fetchList = async (params: Params<{ type?: Timeline['type'] }>) => {
  return request<BaseList<Timeline>>({ url: '/timeline', params })
}
