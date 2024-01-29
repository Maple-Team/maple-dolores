import { Button, Skeleton } from 'antd'
import React, { useCallback, useState } from 'react'

import { useNavigation } from 'react-router-dom'
import { message } from './message'
import { UseImperativeDemo } from './use-imperative-example'
import { UseDebugValueDemo } from './use-debug-value'
import { Component1, Component2 } from './useStateDemo'

// These files generally should only export keys you would define on a route object, such as `loader`, `action`, `Component`, `ErrorBoundary`, etc

export function Component() {
  const showMsg = useCallback(() => {
    message.info()
  }, [])
  const [num, setNum] = useState<number>(0)
  // 导航状态
  const navigation = useNavigation()
  console.log(navigation)
  const isLoading = navigation.state === 'loading'

  return (
    <Skeleton loading={isLoading}>
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
    </Skeleton>
  )
}
Component.displayName = 'ReactDemo'
