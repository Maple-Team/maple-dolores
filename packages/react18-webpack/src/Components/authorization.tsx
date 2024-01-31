import React, { useCallback } from 'react'
import type { UserRole } from '@liutsing/enums'
import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useUserInfo } from '@/http'

export const useAuthorization = () => {
  const { data: user } = useUserInfo()
  if (!user) throw Error('User does not exist!')

  const checkAccess = useCallback(
    ({ allowedRoles }: { allowedRoles: UserRole[] }) => {
      if (allowedRoles?.length > 0) return allowedRoles?.includes(user.role)
    },
    [user.role]
  )

  return {
    checkAccess,
    role: user.role,
  }
}

type AuthorizationProps = {
  /**
   * 无法访问时展示的页面，默认啥也不展示
   */
  forbiddenFallback?: React.ReactNode
  /**
   * 有权限时展示的页面
   */
  children: React.ReactNode
} & (
  | {
      allowedRoles: UserRole[]
      policyCheck?: never
    }
  | {
      allowedRoles?: never
      policyCheck: boolean
    }
)
/**
 * 对比组件允许的权限与当前用户所有的权限，进行对比
 * @param param0
 * @returns
 */
export const Authorization = ({
  forbiddenFallback = null,
  children,
  allowedRoles,
  policyCheck,
}: AuthorizationProps) => {
  const { checkAccess } = useAuthorization()
  let canAccess: boolean | undefined = false
  if (allowedRoles) canAccess = checkAccess({ allowedRoles })

  if (typeof policyCheck !== 'undefined') canAccess = policyCheck

  const navigate = useNavigate()
  const onBack = useCallback(() => {
    navigate(-1)
  }, [navigate])

  return (
    <>
      {canAccess
        ? children
        : forbiddenFallback || (
            <Result
              status={403}
              title="无权限"
              subTitle="您无权限访问当前页面"
              extra={
                <Button
                  onClick={onBack}
                  type="primary"
                >
                  返回
                </Button>
              }
            />
          )}
    </>
  )
}
