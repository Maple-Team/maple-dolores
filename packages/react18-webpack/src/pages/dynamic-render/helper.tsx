import { ReactNode } from 'react'
import { createRoot, Root } from 'react-dom/client'

export function mountReactElement(containerId: string, element: ReactNode) {
  let root: Root | undefined
  let container = document.getElementById(containerId)
  if (!container) {
    container = document.createElement('div')
    container.id = containerId
    document.body.appendChild(container)

    // 使用 createRoot 创建并挂载组件
    root = createRoot(container)
    root.render(element)
  }
  setTimeout(() => {
    root?.unmount()
  }, 3000)
  // 返回 unmount 方法
  return () => root?.unmount()
}
