import { Button, Divider, Skeleton, Space } from 'antd'
import React, { useCallback, useState } from 'react'

import { Link, useNavigate, useNavigation } from 'react-router-dom'
import { UserRole } from '@liutsing/enums'
import { message } from './message'
import { UseImperativeDemo } from './use-imperative-example'
import { UseDebugValueDemo } from './use-debug-value'
import { Component1, Component2 } from './useStateDemo'
import { Authorization } from '@/Components/authorization'
import { ContentContainer } from '@/layouts/content'

// These files generally should only export keys you would define on a route object, such as `loader`, `action`, `Component`, `ErrorBoundary`, etc

export function Component() {
  const showMsg = useCallback(() => {
    message.info()
  }, [])
  const [num, setNum] = useState<number>(0)
  // 导航状态
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'
  const navigate = useNavigate()
  const onJump = useCallback(() => {
    navigate(`/react-demo/${Math.random()}`)
  }, [navigate])

  return (
    <Skeleton loading={isLoading}>
      <Authorization allowedRoles={[UserRole.USER, UserRole.ADMIN]}>
        <ContentContainer>
          <Space>
            <Button
              onClick={onJump}
              type="primary"
            >
              jump nested component
            </Button>
            <Link to={`/react-demo/${Math.random()}`}>jump nested component</Link>

            <Button
              onClick={showMsg}
              type="primary"
            >
              showMsg
            </Button>

            <span>{num}</span>

            <Button
              type="primary"
              onClick={() => {
                setNum((_) => _ + 1)
              }}
            >
              increment
            </Button>
          </Space>
          <Divider />
          <UseImperativeDemo />
          <UseDebugValueDemo />
          <Component1 />
          <Component2
            onClick={() => {
              console.log('123')
            }}
          />
        </ContentContainer>
      </Authorization>
    </Skeleton>
  )
}
Component.displayName = 'ReactDemo'
