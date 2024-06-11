import type { ForwardedRef } from 'react'
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'

export const CommentList = forwardRef((props, ref: ForwardedRef<{ scrollToBottom: () => void }>) => {
  const commentsRef = useRef<HTMLUListElement>(null)
  useImperativeHandle(ref, () => {
    return {
      scrollToBottom() {
        if (commentsRef.current) commentsRef.current.scrollTop = commentsRef.current?.scrollHeight
      },
    }
  }, [])

  const [comments] = useState<string[]>(Array.from({ length: 50 }, (_, i) => `Comment #${i}`))
  return (
    <>
      <ul
        ref={commentsRef}
        style={{ height: 200, overflow: 'auto' }}
      >
        {comments.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  )
})
