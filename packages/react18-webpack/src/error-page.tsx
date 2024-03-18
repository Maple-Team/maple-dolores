import React from 'react'
import type { ErrorResponse } from 'react-router-dom'
import { useRouteError } from 'react-router-dom'
import { Button, Result } from 'antd'

export default function ErrorPage() {
  const error = useRouteError() as ErrorResponse
  console.log(error)

  return (
    <Result
      status={500}
      title="根路由组件渲染出错"
      subTitle={error.data}
      extra={<Button type="primary">返回首页</Button>}
    />
  )
}
