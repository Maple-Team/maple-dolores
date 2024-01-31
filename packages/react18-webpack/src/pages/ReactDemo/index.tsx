import { Button, Skeleton } from 'antd'
import React, { useCallback, useState } from 'react'

import { useNavigation } from 'react-router-dom'
import { UserRole } from '@liutsing/enums'
import { message } from './message'
import { UseImperativeDemo } from './use-imperative-example'
import { UseDebugValueDemo } from './use-debug-value'
import { Component1, Component2 } from './useStateDemo'
import { Authorization } from '@/Components/authorization'

// These files generally should only export keys you would define on a route object, such as `loader`, `action`, `Component`, `ErrorBoundary`, etc

export function Component() {
  const showMsg = useCallback(() => {
    message.info()
  }, [])
  const [num, setNum] = useState<number>(0)
  // 导航状态
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'

  return (
    <Skeleton loading={isLoading}>
      <Authorization allowedRoles={[UserRole.USER, UserRole.ADMIN]}>
        <Button onClick={showMsg}>showMsg</Button>
        <span>{num}</span>
        <Button
          onClick={() => {
            setNum((_) => _ + 1)
          }}
        >
          increment
        </Button>
        <UseImperativeDemo />
        <UseDebugValueDemo />
        <Component1 />
        <Component2
          onClick={() => {
            console.log('123')
          }}
        />
      </Authorization>
    </Skeleton>
  )
}
Component.displayName = 'ReactDemo'
