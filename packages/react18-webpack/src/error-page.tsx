import React from 'react'
import { useRouteError } from 'react-router-dom'
import { Button, Result } from 'antd'
import type { AxiosError } from 'axios'

type CustomError = AxiosError | Error

export default function ErrorPage() {
  const error = useRouteError() as CustomError
  return (
    <Result
      status={500}
      title="Sorry, an unexpected error has occurred."
      subTitle={error.message}
      extra={<Button type="primary">Back Home</Button>}
    />
  )
}
