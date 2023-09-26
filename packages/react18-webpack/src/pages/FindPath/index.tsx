import { Button, Space } from 'antd'
import { uniqBy } from 'lodash-es'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type Point = [number, number]
type Cell = 0 | 1 | 2

export const FindPath = () => {
  const initMap: Cell[] = localStorage.getItem('map')
    ? (JSON.parse(localStorage.getItem('map')!) as Cell[])
    : Array(10000).fill(0)

  const [map, setMap] = useState<Cell[]>(initMap)
  const onSaveMap = useCallback(() => {
    localStorage.setItem('map', JSON.stringify(map))
  }, [map])
  const [isClear, setIsClear] = useState<boolean>()
  const onMouseMove = useCallback(
    (_: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) =>
      setMap((items) => items.map((_item, _index) => (isClear ? 0 : index === _index ? 1 : _item))),
    [isClear]
  )
  useEffect(() => {
    const onMouseDown = () => {
      setIsClear(true)
    }
    const onMouseUp = () => {
      setIsClear(false)
    }
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    const onContextmenuClick = (e: { preventDefault: () => void }) => {
      e.preventDefault()
    }
    document.addEventListener('contextmenu', onContextmenuClick)

    return () => {
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('contextmenu', onContextmenuClick)
    }
  }, [])

  const end: Point = useMemo(() => [99, 99], [])

  //   const findPath = useCallback((start: Point = [0, 0]) => getNext(start, end), [end, getNext])

  type Fn = () => Point[]
  const [pendingTasks, setPendingTask] = useState<Fn[]>([])

  const mapRef = useRef<Cell[]>(map)

  useEffect(() => {
    mapRef.current = map // 更新 ref 中的值，保持最新
  }, [map])

  const getNext = useCallback((curr: Point, target: Point) => {
    const index = 100 * curr[0] + curr[1]
    // console.log(`access ${index}, point: (${curr[0]},${curr[1]})`)
    const newMap = mapRef.current.map((i, _index) => (index === _index ? 2 : i))

    if (curr?.[0] === target[0] && curr?.[1] === target[1]) return [null, null, null, null]
    // 边界、阻碍物
    const [row, col] = curr
    const dimension = [null, null, null, null] as [Point | null, Point | null, Point | null, Point | null]
    if (col - 1 >= 0 && mapRef.current[100 * row + col - 1] === 0) dimension[0] = [row, col - 1] // left
    if (row - 1 >= 0 && mapRef.current[100 * (row - 1) + col] === 0) dimension[1] = [row - 1, col] // upper
    if (col + 1 <= 99 && mapRef.current[100 * row + col + 1] === 0) dimension[2] = [row, col + 1] // right
    if (row + 1 <= 99 && mapRef.current[100 * (row + 1) + col] === 0) dimension[3] = [row + 1, col] // bottom

    setMap(newMap)
    return dimension.filter(Boolean)
  }, [])

  useEffect(() => {
    if (!pendingTasks.length) return

    const nextPoints: Point[][] = []

    pendingTasks.forEach((tasks) => {
      nextPoints.push(tasks())
    })

    // // const newPoints = [...Array.prototype.concat.apply([], nextPoints)].filter(Boolean) as Point[]

    const newPoints = uniqBy(
      [...Array.prototype.concat.apply([], nextPoints)].filter(Boolean) as Point[],
      ([x, y]) => `${x}-${y}`
    )

    const newTasks: Fn[] = []
    newPoints.filter(Boolean).forEach((point) => {
      newTasks.push((() => getNext(point, end)) as Fn)
    })
    setPendingTask(newTasks)
  }, [end, getNext, pendingTasks])

  const onStart = useCallback(() => {
    const nexts = getNext([0, 0], end)
    const tasks: Fn[] = []

    nexts.filter(Boolean).forEach((point) => {
      point && tasks.push((() => getNext(point, end)) as Fn)
    })
    setPendingTask(tasks)
  }, [end, getNext])

  return (
    <div className="mt-4 bg-white p-2 rounded flex flex-col">
      <div className="mb-2">
        <Space>
          <Button
            type="primary"
            onClick={onSaveMap}
          >
            保存
          </Button>
          <Button
            type="primary"
            onClick={onStart}
          >
            寻找路径
          </Button>
        </Space>
      </div>
      <div className="w-[600px] flex flex-wrap ">
        {Array(100)
          .fill(0)
          .map((_, r) => {
            return Array(100)
              .fill(0)
              .map((_, c) => {
                return (
                  <div
                    key={100 * r + c}
                    onMouseMove={(e) => onMouseMove(e, 100 * r + c)}
                    className={`w-[6px] h-[6px] box-border border-0 border-b-[1px]  border-b-white border-r-[1px] border-r-white bg-gray-100 ${
                      map[100 * r + c] === 1 ? '!bg-black' : map[100 * r + c] === 2 ? '!bg-green-300' : ''
                    }`}
                  />
                )
              })
          })}
      </div>
    </div>
  )
}
