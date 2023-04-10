import type { Ref } from 'react'
import React, { forwardRef } from 'react'

const AddComment = forwardRef((props, ref: Ref<HTMLInputElement>) => {
  return (
    <input
      placeholder="Add comment..."
      ref={ref}
    />
  )
})

export default AddComment
