import React from 'react'
import { useMatches, useParams } from 'react-router-dom'

export const NestedComponent = () => {
  const { id } = useParams()

  const matches = useMatches()
  console.log(matches)

  return <div>NestedComponent: {id}</div>
}
