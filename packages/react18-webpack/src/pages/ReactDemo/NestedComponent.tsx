import React from 'react'
import { useParams } from 'react-router-dom'
import { ContentContainer } from '@/layouts/content'

export const NestedComponent = () => {
  const { id } = useParams()

  return (
    <ContentContainer>
      <div>NestedComponent: {id}</div>
    </ContentContainer>
  )
}
