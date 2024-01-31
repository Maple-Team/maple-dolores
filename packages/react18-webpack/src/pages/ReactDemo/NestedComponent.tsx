import React from 'react'
import { useParams } from 'react-router-dom'
import { ContentContainer } from '@/layouts/content'
import { useDataPermission } from '@/http'

export const NestedComponent = () => {
  const { id } = useParams()
  useDataPermission(id)
  // 或者渲染403页面
  return (
    <ContentContainer>
      <div>NestedComponent: {id}</div>
    </ContentContainer>
  )
}
