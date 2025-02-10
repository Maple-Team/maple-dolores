import type { Fiction, Label } from './type'
import { request } from '@/utils'

export const fetchLabels = () => request<Label[]>({ url: '/label/all' })

export const save = (values: Fiction) => {
  return request({
    method: 'post',
    url: '/fiction',
    data: { ...values, words: values.chapterContent.length },
  })
}

export const upload = (values: FormData) => {
  return request({
    method: 'post',
    url: '/fiction/upload',
    data: values,
    headers: {
      ContentType: 'text/html',
    },
  })
}
