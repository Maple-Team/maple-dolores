import { useMutation, useQuery } from '@tanstack/react-query'
import type { UserAccount, UserInfo } from '@liutsing/types-utils'
import { instance } from '../axios'

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (account: UserAccount) => {
      return instance.post<AnyToFix, Partial<UserInfo> & { accessToken: string }>('/auth/login', account)
    },
    mutationKey: ['login-mutation-key'],
  })
}

export const fetchUserInfo = (): Promise<UserInfo> => {
  return instance.get('/auth/profile')
}
export const userInfoQueryKey = 'userinfo-query-key'

export const useUserInfo = () => {
  return useQuery({
    queryKey: [userInfoQueryKey],
    queryFn: fetchUserInfo,
  })
}

export const fetchUserMenus = (): Promise<string[]> => instance.get('/users/menus')
export const userMenusQueryKey = 'user-menus-query-key'
export const useUserMenus = () => {
  return useQuery({
    queryKey: [userMenusQueryKey],
    queryFn: fetchUserMenus,
  })
}
