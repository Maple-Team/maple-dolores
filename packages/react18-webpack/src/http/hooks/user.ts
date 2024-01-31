import { useMutation, useQuery } from '@tanstack/react-query'
import type { UserAccount, UserInfo } from '@liutsing/types-utils'
import { instance } from '../axios'

export const useLoginMutation = () => {
  return useMutation(['login-mutation-key'], (data: UserAccount) =>
    instance.post<AnyToFix, Partial<UserInfo> & { accessToken: string }>('/auth/login', data)
  )
}

export const fetchUserInfo = (): Promise<UserInfo> => {
  return instance.get('/auth/profile')
}
export const userInfoQueryKey = 'userinfo-query-key'

export const useUserInfo = () => {
  return useQuery([userInfoQueryKey], fetchUserInfo)
}

export const fetchUserMenus = (): Promise<string[]> => instance.get('/users/menus')
export const userMenusQueryKey = 'user-menus-query-key'
export const useUserMenus = () => {
  return useQuery(['user-menus-query-key'], fetchUserMenus)
}
