import React from 'react'
import { useParams } from 'react-router-dom'

export const NestedComponent = () => {
  const { id } = useParams()

  return <div>NestedComponent: {id}</div>
}
