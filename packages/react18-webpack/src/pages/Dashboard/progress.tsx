import React, { useMemo } from 'react'
import './progress.css'
import dayjs from 'dayjs'
import { Col, Row } from 'antd'

const dayOfYear = require('dayjs/plugin/dayOfYear')

dayjs.extend(dayOfYear)

// "▓▓▓▓▓▓▓▓▓▓▓░░░░"

const unPassed = '▓'
const passed = '░'

const LineProgress = ({ value, curr, total }: { value: number; curr: number; total: number }) => {
  const data: string[] = useMemo(
    () => Array.from({ length: 50 }, (_, i) => (i < value / 2 ? passed : unPassed)).reverse(),
    [value]
  )
  return (
    <div className="flex">
      <div className="mr-1">{data}</div>
      <span>
        {100 - value}% ({curr}/{total})
      </span>
    </div>
  )
}

const SvgProgress = ({
  year,
  percent,
  curr,
  total,
}: {
  year: number
  percent: number
  curr: number
  total: number
}) => {
  // FIXME 动态渲染

  console.log({
    year,
    percent,
    curr,
    total,
  })

  const rawArray = Array.from({ length: total }, (_, i) => i + 1)
  const lineCount = 31
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      width="340"
      height="175"
      viewBox="0 0 340 175"
    >
      <rect
        width="340"
        height="175"
        fill="#000"
      />
      <g transform="translate(0, 24)">
        <text
          className="text-year"
          transform="translate(15, 0)"
        >
          {year}
        </text>
        <text
          className="text-percent"
          transform="translate(170, 0)"
        >
          {percent}%
        </text>
        <text
          className="text-progress"
          transform="translate(325, 0)"
        >
          {curr}/{total}
        </text>
      </g>
      <g
        transform="translate(15, 40)"
        fill="#6FF2E9"
        strokeWidth="0"
        opacity="0.3"
      >
        {rawArray.map((i) => {
          const row = Math.floor(i / lineCount) + 1
          const col = i % lineCount
          return (
            <circle
              key={i}
              cy={(row - 1) * 10 + 5}
              cx={col * 10}
            />
          )
        })}
      </g>
      <g
        transform="translate(15, 40)"
        fill="#6FF2E9"
        strokeWidth="0"
      >
        {rawArray
          .filter((i) => i <= curr)
          .map((i) => {
            const row = Math.floor(i / lineCount) + 1
            const col = i % lineCount
            return (
              <circle
                key={i}
                cy={(row - 1) * 10 + 5}
                cx={col * 10}
                className="fadeIn"
                style={{ animationDelay: `${i * 20}ms` }}
              />
            )
          })}
      </g>
    </svg>
  )
}

export const Progress = () => {
  const current = dayjs(dayjs().format('YYYY-MM-DD'))
  const next = dayjs(dayjs().add(1, 'year').format('YYYY'))
  // @ts-expect-error: xx
  const currentDay: number = current.dayOfYear()
  const rest = next.diff(current, 'days')

  const total = currentDay + rest - 1
  const unPassed = Math.floor((rest / total) * 100)

  return (
    <Row gutter={24}>
      <Col
        span={24}
        className="mb-8"
      >
        <SvgProgress
          percent={100 - unPassed}
          year={current.year()}
          curr={currentDay}
          total={total}
        />
      </Col>
      <Col span={24}>
        <LineProgress
          value={unPassed}
          curr={currentDay}
          total={total}
        />
      </Col>
    </Row>
  )
}
