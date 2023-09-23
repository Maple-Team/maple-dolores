import React, { useCallback, useState } from 'react'

export const useStateDemo = () => {
  const [num, setNum] = useState<number>(0)

  const changeNum = useCallback((n: number) => {
    setNum(n)
  }, [])

  return {
    num,
    changeNum,
  }
}

export const Component1 = () => {
  const { num } = useStateDemo()
  return <div>{num}</div>
}

export const Component2 = ({ onClick }: { onClick?: () => void }) => {
  const { num, changeNum } = useStateDemo()
  console.count('render')
  return (
    <div
      style={{ width: 100, padding: 6 }}
      onClick={() => {
        changeNum(num + 1)
        onClick?.()
      }}
    >
      {num}
    </div>
  )
}
