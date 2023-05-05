import React, { useCallback, useState } from 'react'

const PanelPage = () => {
  const [leftCollapsed, setLeftCollapsed] = useState<boolean>()
  const [rightCollapsed, setRightCollapsed] = useState<boolean>()
  const onToggleLeft = useCallback(() => {
    setLeftCollapsed((_) => !_)
  }, [])
  const onToggleRight = useCallback(() => {
    setRightCollapsed((_) => !_)
  }, [])
  return (
    <div className="bg-gray-300 h-full relative overflow-x-hidden">
      <div
        className={`absolute h-[calc(100%-14px)] transform left-2 will-change-transform ease-in duration-300 ${
          leftCollapsed ? '-translate-x-full' : 'translate-x-0'
        } my-2`}
      >
        <div className="w-80 h-full bg-white rounded">左侧实际内容区域</div>
        <div
          onClick={onToggleLeft}
          className="absolute -right-6 top-4 w-6 bg-white h-20 flex flex-col justify-center items-center rounded-r cursor-pointer"
        >
          {leftCollapsed ? <>&gt;&gt;</> : <>&lt;&lt;</>}
        </div>
        <div className="absolute bottom-0 right-0 transform translate-x-[calc(100%+12px)] bg-white h-16 p-2">
          额外的底部附加内容
        </div>
      </div>
      <div
        className={`absolute h-[calc(100%-14px)] right-2 transform will-change-transform ease-in duration-300 ${
          rightCollapsed ? 'translate-x-full' : 'translate-x-0'
        } my-2`}
      >
        <div className="w-80 bg-white h-full rounded">右侧实际内容区域</div>
        <div
          onClick={onToggleRight}
          className="absolute -left-6 top-4 w-6 bg-white h-20 flex flex-col justify-center items-center rounded-l cursor-pointer"
        >
          {rightCollapsed ? <>&lt;&lt;</> : <>&gt;&gt;</>}
        </div>
        <div className="absolute bottom-0 left-0 transform -translate-x-[calc(100%+12px)] bg-white h-16 p-2">
          额外的底部附加内容
        </div>
      </div>
      <div className="bg-green-300 flex flex-col justify-center items-center h-full">实际的内容区域</div>
    </div>
  )
}

export default PanelPage
