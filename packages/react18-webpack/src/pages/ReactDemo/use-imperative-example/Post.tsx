import type { ElementRef, ForwardedRef } from 'react'
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { CommentList } from './CommentList'
import AddComment from './AddComment'

export const Post = forwardRef((props, ref: ForwardedRef<{ scrollAndFocusAddComment: () => void }>) => {
  const CommentListRef = useRef<ElementRef<typeof CommentList>>(null)
  const AddCommentRef = useRef<ElementRef<typeof AddComment>>(null)

  useImperativeHandle(
    ref,
    () => {
      return {
        scrollAndFocusAddComment() {
          CommentListRef.current?.scrollToBottom()
          AddCommentRef.current?.focus()
        },
      }
    },
    []
  )
  return (
    <>
      <article>
        <p>Welcome to my blog!</p>
      </article>
      <CommentList ref={CommentListRef} />
      <AddComment ref={AddCommentRef} />
    </>
  )
})
