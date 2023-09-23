import type { ElementRef } from 'react'
import React, { useCallback, useRef } from 'react'
import { Post } from './Post'

export const UseImperativeDemo = () => {
  const postRef = useRef<ElementRef<typeof Post>>(null)
  const handleClick = useCallback(() => {
    postRef.current?.scrollAndFocusAddComment()
  }, [])
  return (
    <div>
      <button onClick={handleClick}>write a comment</button>
      <Post ref={postRef} />
    </div>
  )
}
