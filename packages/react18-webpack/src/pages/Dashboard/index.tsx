import dayjs from 'dayjs'
import React, { useMemo } from 'react'
import { useMatches } from 'react-router-dom'

// "▓▓▓▓▓▓▓▓▓▓▓░░░░"

const unpassed = '▓'
const passed = '░'

const Progress = ({ value }: { value: number }) => {
  const data: string[] = useMemo(
    () => Array.from({ length: 50 }, (_, i) => (i < value / 2 ? passed : unpassed)),
    [value]
  )
  return (
    <div className="flex">
      <div className="mr-1">{data.reverse()}</div>
      <span>{value}%</span>
    </div>
  )
}
export default () => {
  const current = dayjs(dayjs().format('YYYY-MM-DD'))
  const next = dayjs(dayjs().add(1, 'year').format('YYYY'))

  const rest = next.diff(current, 'days')
  const progress = Math.floor((rest / 365) * 100)
  const matches = useMatches()
  console.log(matches)
  return (
    <div>
      <h1 className="py-4 text-[24px]">The rest days of {current.format('YYYY')}</h1>
      <Progress value={progress} />
    </div>
  )
}
