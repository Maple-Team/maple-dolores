import React from 'react'
import { Drawer } from '@liutsing/rc-components'
import '@liutsing/rc-components/dist/cjs/index.css'

const DrawerPage = () => {
  return (
    <div className="bg-gray-300 h-full relative overflow-x-hidden">
      <Drawer
        position="left"
        bottomContent={
          <div className="bottom-0 right-0 transform translate-x-[calc(100%+12px)] bg-white h-16 p-2">
            额外的底部附加内容
          </div>
        }
        foldRenderer={(open) => (open ? <>&lt;&lt;</> : <>&gt;&gt;</>)}
      >
        <div className="w-80 h-full bg-white rounded">左侧实际内容区域</div>
      </Drawer>
      <Drawer
        position="right"
        topContent={<div className="transform -translate-x-[calc(100%+12px)] bg-white h-16 p-2">顶部附加内容</div>}
      >
        <div className="w-80 h-full bg-white rounded">右侧实际内容区域</div>
      </Drawer>
      <div className="bg-green-300 flex flex-col justify-center items-center h-full">实际的内容区域</div>
    </div>
  )
}

export default DrawerPage
