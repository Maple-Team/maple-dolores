import { useMutation, useQuery } from '@tanstack/vue-query'
import type { Todo } from './type'
import { request } from '@/utils'

const syncTodos = async (data: Todo[]) => {
  return request<BaseResponse<null>>({ url: '/todos', data, method: 'POST' })
}
const fetchTodos = async (params: AnyToFix) => {
  return request<BaseList<Todo>>({ url: '/todos', params })
}

export const useTodosQuery = (params: AnyToFix) => {
  return useQuery(['todo-search-list', ...params], () => fetchTodos(params), {})
}

export const useTodoMutation = () => {
  return useMutation(['todo-sync'], (data: Todo[]) => syncTodos(data))
}
