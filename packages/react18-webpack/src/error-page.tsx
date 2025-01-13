import React from 'react'
import type { ErrorResponse } from 'react-router-dom'
import { Link, useRouteError } from 'react-router-dom'
import { Button, Result } from 'antd'
import { AxiosError } from 'axios'

export default function ErrorPage() {
  const error = useRouteError() as ErrorResponse

  if (error instanceof AxiosError) {
    if (error.config?.url === '/api/auth/profile') {
      return (
        <Result
          status={500}
          title={
            <>
              <h1>We&rsquo;ll be back soon!</h1>
            </>
          }
          subTitle={
            <>
              <p>Sorry for the inconvenience but we&rsquo;re performing some maintenance at the moment.</p>
            </>
          }
        />
      )
    }
    return (
      <Result
        status={500}
        // TODO 国际化
        title={error.response?.statusText || error.response?.status}
        subTitle={error.response?.data}
        extra={
          <Link to="/">
            <Button type="primary">返回首页</Button>
          </Link>
        }
      />
    )
  }

  return (
    <Result
      status={500}
      title="根路由组件渲染出错"
      subTitle={error.data}
      extra={
        <Link to="/">
          <Button type="primary">返回首页</Button>
        </Link>
      }
    />
  )
}
