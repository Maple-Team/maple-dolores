import { render } from 'rc-util/lib/React/render'
import React from 'react'
// TODO 实现message/notification

export class message {
  static info() {
    const el = document.createElement('div')
    el.style.position = 'absolute'
    el.style.width = '100%'
    el.style.zIndex = '999'
    el.style.top = '20px'
    el.style.left = '50%'
    el.style.textAlign = 'center'
    el.style.transform = 'translateX(-50%)'

    document.body.append(el)
    render(<div className="w-[120px] h-fit inline-block shadow py-2 bg-white rounded">1234234</div>, el)
  }
}
