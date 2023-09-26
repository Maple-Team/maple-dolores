import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

// import Scrollbar from './scrollbar'
import { Menu } from 'antd'
import type { ItemType } from 'antd/es/menu/hooks/useItems'

export default () => {
  // NOTE 登陆权限判断 -> 参考react-query-auth这个库, 类比vue-query
  const nav = useNavigate()
  const items: ItemType[] = [
    // {
    //   key: 'hooks-example',
    //   label: 'Hooks Example',
    //   style: { cursor: 'pointer' },
    //   onClick() {
    //     nav('/react-hooks')
    //   },
    // },
    // {
    //   label: 'ToolTip example',
    //   key: 'react-tooltip',
    //   style: { cursor: 'pointer' },
    //   onClick() {
    //     nav('/react-tooltip')
    //   },
    // },
    {
      label: 'React Query',
      key: 'react-query',
      style: { cursor: 'pointer' },
      onClick() {
        nav('/react-query')
      },
    },
    {
      label: 'React Amap',
      key: 'react-amap',
      style: { cursor: 'pointer' },
      onClick() {
        nav('/react-amap')
      },
    },
    // {
    //   label: 'Infinite Scroll',
    //   key: 'react-infinite-scroll-component',
    //   style: { cursor: 'pointer' },
    //   onClick() {
    //     nav('/react-infinite-scroll-component')
    //   },
    // },
    {
      label: 'React Demo',
      key: 'react-demo',
      style: { cursor: 'pointer' },
      onClick() {
        nav('/react-demo')
      },
    },
    {
      label: 'React Panel',
      key: 'react-panel',
      style: { cursor: 'pointer' },
      onClick() {
        nav('/react-panel')
      },
    },
    {
      label: 'Find Path',
      key: 'Find-Path',
      style: { cursor: 'pointer' },
      onClick() {
        nav('/find-path')
      },
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
        <header className="py-3 px-4">&nbsp;</header>
        <div className="flex-1 px-4 bg-gray-100">
          <Outlet />
        </div>
        <footer className="py-3 text-center">footer</footer>
      </main>
    </div>
  )
}
