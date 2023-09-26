import { Button, Space } from 'antd'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

type Point = [number, number]
type Cell = 0 | 1 | 2
const visitedPoints = new Set<number>()

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

  console.log(visitedPoints.size, 'visitedPoints.size')
  const getNext = useCallback(
    (curr: Point, target: Point) => {
      const index = 100 * curr[0] + curr[1]
      if (visitedPoints.has(index)) return

      //   console.count(`access ${index}, point: (${curr[0]}, ${curr[1]})`)
      visitedPoints.add(index)

      if (curr?.[0] === target[0] && curr?.[1] === target[1]) return null
      // 边界、阻碍物
      const [row, col] = curr
      const dimension = [null, null, null, null] as [Point | null, Point | null, Point | null, Point | null]
      if (col - 1 >= 0 && map[100 * row + col - 1] === 0) dimension[0] = [row, col - 1] // left
      if (row - 1 >= 0 && map[100 * (row - 1) + col] === 0) dimension[1] = [row - 1, col] // upper
      if (col + 1 <= 99 && map[100 * row + col + 1] === 0) dimension[2] = [row, col + 1] // right
      if (row + 1 <= 99 && map[100 * (row + 1) + col] === 0) dimension[3] = [row + 1, col] // bottom

      return dimension.filter(Boolean).filter((p) => (p ? !visitedPoints.has(100 * p[0] + p[1]) : false))
    },
    [map]
  )

  const [nextPoints, setNextPoints] = useState<Point[]>()

  // 起始点
  const onStart = useCallback(() => {
    const nexts = getNext([0, 0], end)
    setNextPoints(nexts?.filter(Boolean) as Point[])
  }, [end, getNext])

  useEffect(() => {
    let newPoints: Point[] = []
    nextPoints?.filter(Boolean).forEach((point) => {
      if (point) {
        const siblings = getNext(point, end)?.filter(Boolean) as Point[]
        newPoints = newPoints.concat(siblings)
        setNextPoints((points) => points?.filter((p) => p === point))
      }
    })

    setTimeout(() => {
      if (newPoints.length) setNextPoints(newPoints)
    }, 100)
  }, [end, getNext, nextPoints])

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
                const index = 100 * r + c
                return (
                  <div
                    key={index}
                    onMouseMove={(e) => onMouseMove(e, index)}
                    className={`w-[6px] h-[6px] box-border border-0 border-b-[1px]  border-b-white border-r-[1px] border-r-white bg-gray-100 ${
                      map[index] === 1 ? '!bg-black' : visitedPoints.has(index) ? '!bg-green-300' : ''
                    }`}
                  />
                )
              })
          })}
      </div>
    </div>
  )
}
