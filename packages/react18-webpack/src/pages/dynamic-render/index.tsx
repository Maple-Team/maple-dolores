import React from 'react'
import { render } from '@liutsing/react-render'
import { mountReactElement } from './helper'

const ReactAmap = () => {
  return (
    <>
      <div
        onClick={() => {
          mountReactElement(`${Math.random()}`, <div>1122222222222222</div>)
        }}
      >
        mountReactElement
      </div>
      <div
        onClick={() => {
          const container = document.createElement('div')
          container.id = Math.random().toString()
          document.body.appendChild(container)
          // 创建一个新的根实例
          render(<div>112222222render2222222</div>, container)
        }}
      >
        @liutsing/react-render
      </div>
    </>
  )
}
export default ReactAmap
