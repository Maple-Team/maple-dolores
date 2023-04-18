import { Button } from 'antd'
import React, { useCallback, useState } from 'react'

import { message } from './message'
import { UseImperativeDemo } from './use-imperative-example'
import { UseDebugValueDemo } from './use-debug-value'
import { Component1, Component2 } from './useStateDemo'

export const ReactDemo = () => {
  const showMsg = useCallback(() => {
    message.info()
  }, [])
  const [num, setNum] = useState<number>(0)
  return (
    <div>
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
      <Component2 />
    </div>
  )
}
