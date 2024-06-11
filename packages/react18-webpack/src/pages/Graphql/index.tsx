import { gql, useQuery } from '@apollo/client'
import React from 'react'

const GET_LOCATIONS = gql`
  query GetRecipe {
    recipe {
      id
      description
    }
  }
`

// interface Recipe {
//   id: string
//   description: string
// }

export default function GraphqlDemo() {
  const { loading, error, data } = useQuery(GET_LOCATIONS, { variables: { id: '1' } })

  console.log(data)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>

  // @ts-expect-error: xx
  return data.recipe.map(({ id, description }) => (
    <div key={id}>
      <h3>{id}</h3>
      <br />
      <b>About this location:</b>
      <p>{description}</p>
      <br />
    </div>
  ))
}
