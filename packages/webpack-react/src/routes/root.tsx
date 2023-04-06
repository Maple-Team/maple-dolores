import React from 'react'
import { Outlet } from 'react-router-dom'

// import Scrollbar from './scrollbar'
import { Menu } from 'antd'
import { ItemType } from 'antd/es/menu/hooks/useItems'

export default () => {
  const items: ItemType[] = [
    { title: 'hooks example', key: 'rc', label: 'hooks example' },
    {
      label: 'ToolTip example',
      key: 'ToolTip',
    },
    {
      label: 'React Query',
      key: 'ReactQuery',
    },
    {
      label: 'React Amap',
      key: 'ReactAmap',
    },
    {
      label: 'infinite-scroll',
      key: 'react-infinite-scroll-component',
    },
  ]
  return (
    <div className="flex h-full">
      <aside className="w-[246px]">
        <Menu
          defaultSelectedKeys={['2']}
          items={items}
        />
      </aside>
      <main className="flex-1 flex flex-col justify-between">
        <header>header</header>
        <div className="flex-1">
          <Outlet />
        </div>
        <footer>footer</footer>
      </main>
    </div>
  )
}
