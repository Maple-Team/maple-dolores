import { Button } from 'antd'
import React, { useCallback } from 'react'

import { message } from './message'
import { UseImperativeDemo } from './use-imperative-example'
import { UseDebugValueDemo } from './use-debug-value'

export const ReactDemo = () => {
  const showMsg = useCallback(() => {
    message.info()
  }, [])

  return (
    <div>
      <Button onClick={showMsg}>showMsg</Button>
      <UseImperativeDemo />
      <UseDebugValueDemo />
    </div>
  )
}
