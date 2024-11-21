import React, { useMemo } from 'react'
import './progress.css'
import dayjs from 'dayjs'
import { Row, Col } from 'antd'

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
        <circle
          cx="5"
          cy="5"
        />
        <circle
          cx="15"
          cy="5"
        />
        <circle
          cx="25"
          cy="5"
        />
        <circle
          cx="35"
          cy="5"
        />
        <circle
          cx="45"
          cy="5"
        />
        <circle
          cx="55"
          cy="5"
        />
        <circle
          cx="65"
          cy="5"
        />
        <circle
          cx="75"
          cy="5"
        />
        <circle
          cx="85"
          cy="5"
        />
        <circle
          cx="95"
          cy="5"
        />
        <circle
          cx="105"
          cy="5"
        />
        <circle
          cx="115"
          cy="5"
        />
        <circle
          cx="125"
          cy="5"
        />
        <circle
          cx="135"
          cy="5"
        />
        <circle
          cx="145"
          cy="5"
        />
        <circle
          cx="155"
          cy="5"
        />
        <circle
          cx="165"
          cy="5"
        />
        <circle
          cx="175"
          cy="5"
        />
        <circle
          cx="185"
          cy="5"
        />
        <circle
          cx="195"
          cy="5"
        />
        <circle
          cx="205"
          cy="5"
        />
        <circle
          cx="215"
          cy="5"
        />
        <circle
          cx="225"
          cy="5"
        />
        <circle
          cx="235"
          cy="5"
        />
        <circle
          cx="245"
          cy="5"
        />
        <circle
          cx="255"
          cy="5"
        />
        <circle
          cx="265"
          cy="5"
        />
        <circle
          cx="275"
          cy="5"
        />
        <circle
          cx="285"
          cy="5"
        />
        <circle
          cx="295"
          cy="5"
        />
        <circle
          cx="305"
          cy="5"
        />
        <circle
          cx="20"
          cy="15"
        />
        <circle
          cx="30"
          cy="15"
        />
        <circle
          cx="40"
          cy="15"
        />
        <circle
          cx="50"
          cy="15"
        />
        <circle
          cx="60"
          cy="15"
        />
        <circle
          cx="70"
          cy="15"
        />
        <circle
          cx="80"
          cy="15"
        />
        <circle
          cx="90"
          cy="15"
        />
        <circle
          cx="100"
          cy="15"
        />
        <circle
          cx="110"
          cy="15"
        />
        <circle
          cx="120"
          cy="15"
        />
        <circle
          cx="130"
          cy="15"
        />
        <circle
          cx="140"
          cy="15"
        />
        <circle
          cx="150"
          cy="15"
        />
        <circle
          cx="160"
          cy="15"
        />
        <circle
          cx="170"
          cy="15"
        />
        <circle
          cx="180"
          cy="15"
        />
        <circle
          cx="190"
          cy="15"
        />
        <circle
          cx="200"
          cy="15"
        />
        <circle
          cx="210"
          cy="15"
        />
        <circle
          cx="220"
          cy="15"
        />
        <circle
          cx="230"
          cy="15"
        />
        <circle
          cx="240"
          cy="15"
        />
        <circle
          cx="250"
          cy="15"
        />
        <circle
          cx="260"
          cy="15"
        />
        <circle
          cx="270"
          cy="15"
        />
        <circle
          cx="280"
          cy="15"
        />
        <circle
          cx="290"
          cy="15"
        />
        <circle
          cx="300"
          cy="15"
        />
        <circle
          cx="5"
          cy="25"
        />
        <circle
          cx="15"
          cy="25"
        />
        <circle
          cx="25"
          cy="25"
        />
        <circle
          cx="35"
          cy="25"
        />
        <circle
          cx="45"
          cy="25"
        />
        <circle
          cx="55"
          cy="25"
        />
        <circle
          cx="65"
          cy="25"
        />
        <circle
          cx="75"
          cy="25"
        />
        <circle
          cx="85"
          cy="25"
        />
        <circle
          cx="95"
          cy="25"
        />
        <circle
          cx="105"
          cy="25"
        />
        <circle
          cx="115"
          cy="25"
        />
        <circle
          cx="125"
          cy="25"
        />
        <circle
          cx="135"
          cy="25"
        />
        <circle
          cx="145"
          cy="25"
        />
        <circle
          cx="155"
          cy="25"
        />
        <circle
          cx="165"
          cy="25"
        />
        <circle
          cx="175"
          cy="25"
        />
        <circle
          cx="185"
          cy="25"
        />
        <circle
          cx="195"
          cy="25"
        />
        <circle
          cx="205"
          cy="25"
        />
        <circle
          cx="215"
          cy="25"
        />
        <circle
          cx="225"
          cy="25"
        />
        <circle
          cx="235"
          cy="25"
        />
        <circle
          cx="245"
          cy="25"
        />
        <circle
          cx="255"
          cy="25"
        />
        <circle
          cx="265"
          cy="25"
        />
        <circle
          cx="275"
          cy="25"
        />
        <circle
          cx="285"
          cy="25"
        />
        <circle
          cx="295"
          cy="25"
        />
        <circle
          cx="305"
          cy="25"
        />
        <circle
          cx="10"
          cy="35"
        />
        <circle
          cx="20"
          cy="35"
        />
        <circle
          cx="30"
          cy="35"
        />
        <circle
          cx="40"
          cy="35"
        />
        <circle
          cx="50"
          cy="35"
        />
        <circle
          cx="60"
          cy="35"
        />
        <circle
          cx="70"
          cy="35"
        />
        <circle
          cx="80"
          cy="35"
        />
        <circle
          cx="90"
          cy="35"
        />
        <circle
          cx="100"
          cy="35"
        />
        <circle
          cx="110"
          cy="35"
        />
        <circle
          cx="120"
          cy="35"
        />
        <circle
          cx="130"
          cy="35"
        />
        <circle
          cx="140"
          cy="35"
        />
        <circle
          cx="150"
          cy="35"
        />
        <circle
          cx="160"
          cy="35"
        />
        <circle
          cx="170"
          cy="35"
        />
        <circle
          cx="180"
          cy="35"
        />
        <circle
          cx="190"
          cy="35"
        />
        <circle
          cx="200"
          cy="35"
        />
        <circle
          cx="210"
          cy="35"
        />
        <circle
          cx="220"
          cy="35"
        />
        <circle
          cx="230"
          cy="35"
        />
        <circle
          cx="240"
          cy="35"
        />
        <circle
          cx="250"
          cy="35"
        />
        <circle
          cx="260"
          cy="35"
        />
        <circle
          cx="270"
          cy="35"
        />
        <circle
          cx="280"
          cy="35"
        />
        <circle
          cx="290"
          cy="35"
        />
        <circle
          cx="300"
          cy="35"
        />
        <circle
          cx="5"
          cy="45"
        />
        <circle
          cx="15"
          cy="45"
        />
        <circle
          cx="25"
          cy="45"
        />
        <circle
          cx="35"
          cy="45"
        />
        <circle
          cx="45"
          cy="45"
        />
        <circle
          cx="55"
          cy="45"
        />
        <circle
          cx="65"
          cy="45"
        />
        <circle
          cx="75"
          cy="45"
        />
        <circle
          cx="85"
          cy="45"
        />
        <circle
          cx="95"
          cy="45"
        />
        <circle
          cx="105"
          cy="45"
        />
        <circle
          cx="115"
          cy="45"
        />
        <circle
          cx="125"
          cy="45"
        />
        <circle
          cx="135"
          cy="45"
        />
        <circle
          cx="145"
          cy="45"
        />
        <circle
          cx="155"
          cy="45"
        />
        <circle
          cx="165"
          cy="45"
        />
        <circle
          cx="175"
          cy="45"
        />
        <circle
          cx="185"
          cy="45"
        />
        <circle
          cx="195"
          cy="45"
        />
        <circle
          cx="205"
          cy="45"
        />
        <circle
          cx="215"
          cy="45"
        />
        <circle
          cx="225"
          cy="45"
        />
        <circle
          cx="235"
          cy="45"
        />
        <circle
          cx="245"
          cy="45"
        />
        <circle
          cx="255"
          cy="45"
        />
        <circle
          cx="265"
          cy="45"
        />
        <circle
          cx="275"
          cy="45"
        />
        <circle
          cx="285"
          cy="45"
        />
        <circle
          cx="295"
          cy="45"
        />
        <circle
          cx="305"
          cy="45"
        />
        <circle
          cx="10"
          cy="55"
        />
        <circle
          cx="20"
          cy="55"
        />
        <circle
          cx="30"
          cy="55"
        />
        <circle
          cx="40"
          cy="55"
        />
        <circle
          cx="50"
          cy="55"
        />
        <circle
          cx="60"
          cy="55"
        />
        <circle
          cx="70"
          cy="55"
        />
        <circle
          cx="80"
          cy="55"
        />
        <circle
          cx="90"
          cy="55"
        />
        <circle
          cx="100"
          cy="55"
        />
        <circle
          cx="110"
          cy="55"
        />
        <circle
          cx="120"
          cy="55"
        />
        <circle
          cx="130"
          cy="55"
        />
        <circle
          cx="140"
          cy="55"
        />
        <circle
          cx="150"
          cy="55"
        />
        <circle
          cx="160"
          cy="55"
        />
        <circle
          cx="170"
          cy="55"
        />
        <circle
          cx="180"
          cy="55"
        />
        <circle
          cx="190"
          cy="55"
        />
        <circle
          cx="200"
          cy="55"
        />
        <circle
          cx="210"
          cy="55"
        />
        <circle
          cx="220"
          cy="55"
        />
        <circle
          cx="230"
          cy="55"
        />
        <circle
          cx="240"
          cy="55"
        />
        <circle
          cx="250"
          cy="55"
        />
        <circle
          cx="260"
          cy="55"
        />
        <circle
          cx="270"
          cy="55"
        />
        <circle
          cx="280"
          cy="55"
        />
        <circle
          cx="290"
          cy="55"
        />
        <circle
          cx="300"
          cy="55"
        />
        <circle
          cx="5"
          cy="65"
        />
        <circle
          cx="15"
          cy="65"
        />
        <circle
          cx="25"
          cy="65"
        />
        <circle
          cx="35"
          cy="65"
        />
        <circle
          cx="45"
          cy="65"
        />
        <circle
          cx="55"
          cy="65"
        />
        <circle
          cx="65"
          cy="65"
        />
        <circle
          cx="75"
          cy="65"
        />
        <circle
          cx="85"
          cy="65"
        />
        <circle
          cx="95"
          cy="65"
        />
        <circle
          cx="105"
          cy="65"
        />
        <circle
          cx="115"
          cy="65"
        />
        <circle
          cx="125"
          cy="65"
        />
        <circle
          cx="135"
          cy="65"
        />
        <circle
          cx="145"
          cy="65"
        />
        <circle
          cx="155"
          cy="65"
        />
        <circle
          cx="165"
          cy="65"
        />
        <circle
          cx="175"
          cy="65"
        />
        <circle
          cx="185"
          cy="65"
        />
        <circle
          cx="195"
          cy="65"
        />
        <circle
          cx="205"
          cy="65"
        />
        <circle
          cx="215"
          cy="65"
        />
        <circle
          cx="225"
          cy="65"
        />
        <circle
          cx="235"
          cy="65"
        />
        <circle
          cx="245"
          cy="65"
        />
        <circle
          cx="255"
          cy="65"
        />
        <circle
          cx="265"
          cy="65"
        />
        <circle
          cx="275"
          cy="65"
        />
        <circle
          cx="285"
          cy="65"
        />
        <circle
          cx="295"
          cy="65"
        />
        <circle
          cx="305"
          cy="65"
        />
        <circle
          cx="5"
          cy="75"
        />
        <circle
          cx="15"
          cy="75"
        />
        <circle
          cx="25"
          cy="75"
        />
        <circle
          cx="35"
          cy="75"
        />
        <circle
          cx="45"
          cy="75"
        />
        <circle
          cx="55"
          cy="75"
        />
        <circle
          cx="65"
          cy="75"
        />
        <circle
          cx="75"
          cy="75"
        />
        <circle
          cx="85"
          cy="75"
        />
        <circle
          cx="95"
          cy="75"
        />
        <circle
          cx="105"
          cy="75"
        />
        <circle
          cx="115"
          cy="75"
        />
        <circle
          cx="125"
          cy="75"
        />
        <circle
          cx="135"
          cy="75"
        />
        <circle
          cx="145"
          cy="75"
        />
        <circle
          cx="155"
          cy="75"
        />
        <circle
          cx="165"
          cy="75"
        />
        <circle
          cx="175"
          cy="75"
        />
        <circle
          cx="185"
          cy="75"
        />
        <circle
          cx="195"
          cy="75"
        />
        <circle
          cx="205"
          cy="75"
        />
        <circle
          cx="215"
          cy="75"
        />
        <circle
          cx="225"
          cy="75"
        />
        <circle
          cx="235"
          cy="75"
        />
        <circle
          cx="245"
          cy="75"
        />
        <circle
          cx="255"
          cy="75"
        />
        <circle
          cx="265"
          cy="75"
        />
        <circle
          cx="275"
          cy="75"
        />
        <circle
          cx="285"
          cy="75"
        />
        <circle
          cx="295"
          cy="75"
        />
        <circle
          cx="305"
          cy="75"
        />
        <circle
          cx="10"
          cy="85"
        />
        <circle
          cx="20"
          cy="85"
        />
        <circle
          cx="30"
          cy="85"
        />
        <circle
          cx="40"
          cy="85"
        />
        <circle
          cx="50"
          cy="85"
        />
        <circle
          cx="60"
          cy="85"
        />
        <circle
          cx="70"
          cy="85"
        />
        <circle
          cx="80"
          cy="85"
        />
        <circle
          cx="90"
          cy="85"
        />
        <circle
          cx="100"
          cy="85"
        />
        <circle
          cx="110"
          cy="85"
        />
        <circle
          cx="120"
          cy="85"
        />
        <circle
          cx="130"
          cy="85"
        />
        <circle
          cx="140"
          cy="85"
        />
        <circle
          cx="150"
          cy="85"
        />
        <circle
          cx="160"
          cy="85"
        />
        <circle
          cx="170"
          cy="85"
        />
        <circle
          cx="180"
          cy="85"
        />
        <circle
          cx="190"
          cy="85"
        />
        <circle
          cx="200"
          cy="85"
        />
        <circle
          cx="210"
          cy="85"
        />
        <circle
          cx="220"
          cy="85"
        />
        <circle
          cx="230"
          cy="85"
        />
        <circle
          cx="240"
          cy="85"
        />
        <circle
          cx="250"
          cy="85"
        />
        <circle
          cx="260"
          cy="85"
        />
        <circle
          cx="270"
          cy="85"
        />
        <circle
          cx="280"
          cy="85"
        />
        <circle
          cx="290"
          cy="85"
        />
        <circle
          cx="300"
          cy="85"
        />
        <circle
          cx="5"
          cy="95"
        />
        <circle
          cx="15"
          cy="95"
        />
        <circle
          cx="25"
          cy="95"
        />
        <circle
          cx="35"
          cy="95"
        />
        <circle
          cx="45"
          cy="95"
        />
        <circle
          cx="55"
          cy="95"
        />
        <circle
          cx="65"
          cy="95"
        />
        <circle
          cx="75"
          cy="95"
        />
        <circle
          cx="85"
          cy="95"
        />
        <circle
          cx="95"
          cy="95"
        />
        <circle
          cx="105"
          cy="95"
        />
        <circle
          cx="115"
          cy="95"
        />
        <circle
          cx="125"
          cy="95"
        />
        <circle
          cx="135"
          cy="95"
        />
        <circle
          cx="145"
          cy="95"
        />
        <circle
          cx="155"
          cy="95"
        />
        <circle
          cx="165"
          cy="95"
        />
        <circle
          cx="175"
          cy="95"
        />
        <circle
          cx="185"
          cy="95"
        />
        <circle
          cx="195"
          cy="95"
        />
        <circle
          cx="205"
          cy="95"
        />
        <circle
          cx="215"
          cy="95"
        />
        <circle
          cx="225"
          cy="95"
        />
        <circle
          cx="235"
          cy="95"
        />
        <circle
          cx="245"
          cy="95"
        />
        <circle
          cx="255"
          cy="95"
        />
        <circle
          cx="265"
          cy="95"
        />
        <circle
          cx="275"
          cy="95"
        />
        <circle
          cx="285"
          cy="95"
        />
        <circle
          cx="295"
          cy="95"
        />
        <circle
          cx="305"
          cy="95"
        />
        <circle
          cx="10"
          cy="105"
        />
        <circle
          cx="20"
          cy="105"
        />
        <circle
          cx="30"
          cy="105"
        />
        <circle
          cx="40"
          cy="105"
        />
        <circle
          cx="50"
          cy="105"
        />
        <circle
          cx="60"
          cy="105"
        />
        <circle
          cx="70"
          cy="105"
        />
        <circle
          cx="80"
          cy="105"
        />
        <circle
          cx="90"
          cy="105"
        />
        <circle
          cx="100"
          cy="105"
        />
        <circle
          cx="110"
          cy="105"
        />
        <circle
          cx="120"
          cy="105"
        />
        <circle
          cx="130"
          cy="105"
        />
        <circle
          cx="140"
          cy="105"
        />
        <circle
          cx="150"
          cy="105"
        />
        <circle
          cx="160"
          cy="105"
        />
        <circle
          cx="170"
          cy="105"
        />
        <circle
          cx="180"
          cy="105"
        />
        <circle
          cx="190"
          cy="105"
        />
        <circle
          cx="200"
          cy="105"
        />
        <circle
          cx="210"
          cy="105"
        />
        <circle
          cx="220"
          cy="105"
        />
        <circle
          cx="230"
          cy="105"
        />
        <circle
          cx="240"
          cy="105"
        />
        <circle
          cx="250"
          cy="105"
        />
        <circle
          cx="260"
          cy="105"
        />
        <circle
          cx="270"
          cy="105"
        />
        <circle
          cx="280"
          cy="105"
        />
        <circle
          cx="290"
          cy="105"
        />
        <circle
          cx="300"
          cy="105"
        />
        <circle
          cx="5"
          cy="115"
        />
        <circle
          cx="15"
          cy="115"
        />
        <circle
          cx="25"
          cy="115"
        />
        <circle
          cx="35"
          cy="115"
        />
        <circle
          cx="45"
          cy="115"
        />
        <circle
          cx="55"
          cy="115"
        />
        <circle
          cx="65"
          cy="115"
        />
        <circle
          cx="75"
          cy="115"
        />
        <circle
          cx="85"
          cy="115"
        />
        <circle
          cx="95"
          cy="115"
        />
        <circle
          cx="105"
          cy="115"
        />
        <circle
          cx="115"
          cy="115"
        />
        <circle
          cx="125"
          cy="115"
        />
        <circle
          cx="135"
          cy="115"
        />
        <circle
          cx="145"
          cy="115"
        />
        <circle
          cx="155"
          cy="115"
        />
        <circle
          cx="165"
          cy="115"
        />
        <circle
          cx="175"
          cy="115"
        />
        <circle
          cx="185"
          cy="115"
        />
        <circle
          cx="195"
          cy="115"
        />
        <circle
          cx="205"
          cy="115"
        />
        <circle
          cx="215"
          cy="115"
        />
        <circle
          cx="225"
          cy="115"
        />
        <circle
          cx="235"
          cy="115"
        />
        <circle
          cx="245"
          cy="115"
        />
        <circle
          cx="255"
          cy="115"
        />
        <circle
          cx="265"
          cy="115"
        />
        <circle
          cx="275"
          cy="115"
        />
        <circle
          cx="285"
          cy="115"
        />
        <circle
          cx="295"
          cy="115"
        />
        <circle
          cx="305"
          cy="115"
        />
      </g>
      <g
        transform="translate(15, 40)"
        fill="#6FF2E9"
        strokeWidth="0"
      >
        <circle
          cx="5"
          cy="5"
          className="fadeIn"
          style={{ animationDelay: '20ms' }}
        />
        <circle
          cx="15"
          cy="5"
          className="fadeIn"
          style={{ animationDelay: '40ms' }}
        />
        <circle
          cx="25"
          cy="5"
          className="fadeIn"
          style={{ animationDelay: '60ms' }}
        />
        <circle
          cx="35"
          cy="5"
          className="fadeIn"
          style={{ animationDelay: '80ms' }}
        />
        <circle
          cx="45"
          cy="5"
          className="fadeIn"
          style={{ animationDelay: '100ms' }}
        />
        <circle
          cx="55"
          cy="5"
          className="fadeIn"
          style={{ animationDelay: '120ms' }}
        />
        <circle
          cx="65"
          cy="5"
          className="fadeIn"
          style={{ animationDelay: '140ms' }}
        />
        <circle
          cx="75"
          cy="5"
          className="fadeIn"
          style={{ animationDelay: '160ms' }}
        />
        <circle
          cx="85"
          cy="5"
          className="fadeIn"
          style={{ animationDelay: '180ms' }}
        />
        <circle
          cx="95"
          cy="5"
          className="fadeIn"
          style={{ animationDelay: '200ms' }}
        />
        <circle
          cx="105"
          cy="5"
          className="fadeIn"
          style={{ animationDelay: '220ms' }}
        />
        <circle
          cx="115"
          cy="5"
          className="fadeIn"
          style={{ animationDelay: '240ms' }}
        />
        <circle
          cx="125"
          cy="5"
          className="fadeIn"
          style={{ animationDelay: '260ms' }}
        />
        <circle
          cx="135"
          cy="5"
          className="fadeIn"
          style={{ animationDelay: '280ms' }}
        />
        <circle
          cx="145"
          cy="5"
          className="fadeIn"
          style={{ animationDelay: '300ms' }}
        />
        <circle
          cx="155"
          cy="5"
          className="fadeIn"
          style={{ animationDelay: '320ms' }}
        />
        <circle
          cx="165"
          cy="5"
          className="fadeIn"
          style={{ animationDelay: '340ms' }}
        />
        <circle
          cx="175"
          cy="5"
          className="fadeIn"
          style={{ animationDelay: '360ms' }}
        />
        <circle
          cx="185"
          cy="5"
          className="fadeIn"
          style={{ animationDelay: '380ms' }}
        />
        <circle
          cx="195"
          cy="5"
          className="fadeIn"
          style={{ animationDelay: '400ms' }}
        />
        <circle
          cx="205"
          cy="5"
          className="fadeIn"
          style={{ animationDelay: '420ms' }}
        />
        <circle
          cx="215"
          cy="5"
          className="fadeIn"
          style={{ animationDelay: '440ms' }}
        />
        <circle
          cx="225"
          cy="5"
          className="fadeIn"
          style={{ animationDelay: '460ms' }}
        />
        <circle
          cx="235"
          cy="5"
          className="fadeIn"
          style={{ animationDelay: '480ms' }}
        />
        <circle
          cx="245"
          cy="5"
          className="fadeIn"
          style={{ animationDelay: '500ms' }}
        />
        <circle
          cx="255"
          cy="5"
          className="fadeIn"
          style={{ animationDelay: '520ms' }}
        />
        <circle
          cx="265"
          cy="5"
          className="fadeIn"
          style={{ animationDelay: '540ms' }}
        />
        <circle
          cx="275"
          cy="5"
          className="fadeIn"
          style={{ animationDelay: '560ms' }}
        />
        <circle
          cx="285"
          cy="5"
          className="fadeIn"
          style={{ animationDelay: '580ms' }}
        />
        <circle
          cx="295"
          cy="5"
          className="fadeIn"
          style={{ animationDelay: '600ms' }}
        />
        <circle
          cx="305"
          cy="5"
          className="fadeIn"
          style={{ animationDelay: '620ms' }}
        />
        <circle
          cx="20"
          cy="15"
          className="fadeIn"
          style={{ animationDelay: '640ms' }}
        />
        <circle
          cx="30"
          cy="15"
          className="fadeIn"
          style={{ animationDelay: '660ms' }}
        />
        <circle
          cx="40"
          cy="15"
          className="fadeIn"
          style={{ animationDelay: '680ms' }}
        />
        <circle
          cx="50"
          cy="15"
          className="fadeIn"
          style={{ animationDelay: '700ms' }}
        />
        <circle
          cx="60"
          cy="15"
          className="fadeIn"
          style={{ animationDelay: '720ms' }}
        />
        <circle
          cx="70"
          cy="15"
          className="fadeIn"
          style={{ animationDelay: '740ms' }}
        />
        <circle
          cx="80"
          cy="15"
          className="fadeIn"
          style={{ animationDelay: '760ms' }}
        />
        <circle
          cx="90"
          cy="15"
          className="fadeIn"
          style={{ animationDelay: '780ms' }}
        />
        <circle
          cx="100"
          cy="15"
          className="fadeIn"
          style={{ animationDelay: '800ms' }}
        />
        <circle
          cx="110"
          cy="15"
          className="fadeIn"
          style={{ animationDelay: '820ms' }}
        />
        <circle
          cx="120"
          cy="15"
          className="fadeIn"
          style={{ animationDelay: '840ms' }}
        />
        <circle
          cx="130"
          cy="15"
          className="fadeIn"
          style={{ animationDelay: '860ms' }}
        />
        <circle
          cx="140"
          cy="15"
          className="fadeIn"
          style={{ animationDelay: '880ms' }}
        />
        <circle
          cx="150"
          cy="15"
          className="fadeIn"
          style={{ animationDelay: '900ms' }}
        />
        <circle
          cx="160"
          cy="15"
          className="fadeIn"
          style={{ animationDelay: '920ms' }}
        />
        <circle
          cx="170"
          cy="15"
          className="fadeIn"
          style={{ animationDelay: '940ms' }}
        />
        <circle
          cx="180"
          cy="15"
          className="fadeIn"
          style={{ animationDelay: '960ms' }}
        />
        <circle
          cx="190"
          cy="15"
          className="fadeIn"
          style={{ animationDelay: '980ms' }}
        />
        <circle
          cx="200"
          cy="15"
          className="fadeIn"
          style={{ animationDelay: '1000ms' }}
        />
        <circle
          cx="210"
          cy="15"
          className="fadeIn"
          style={{ animationDelay: '1020ms' }}
        />
        <circle
          cx="220"
          cy="15"
          className="fadeIn"
          style={{ animationDelay: '1040ms' }}
        />
        <circle
          cx="230"
          cy="15"
          className="fadeIn"
          style={{ animationDelay: '1060ms' }}
        />
        <circle
          cx="240"
          cy="15"
          className="fadeIn"
          style={{ animationDelay: '1080ms' }}
        />
        <circle
          cx="250"
          cy="15"
          className="fadeIn"
          style={{ animationDelay: '1100ms' }}
        />
        <circle
          cx="260"
          cy="15"
          className="fadeIn"
          style={{ animationDelay: '1120ms' }}
        />
        <circle
          cx="270"
          cy="15"
          className="fadeIn"
          style={{ animationDelay: '1140ms' }}
        />
        <circle
          cx="280"
          cy="15"
          className="fadeIn"
          style={{ animationDelay: '1160ms' }}
        />
        <circle
          cx="290"
          cy="15"
          className="fadeIn"
          style={{ animationDelay: '1180ms' }}
        />
        <circle
          cx="300"
          cy="15"
          className="fadeIn"
          style={{ animationDelay: '1200ms' }}
        />
        <circle
          cx="5"
          cy="25"
          className="fadeIn"
          style={{ animationDelay: '1220ms' }}
        />
        <circle
          cx="15"
          cy="25"
          className="fadeIn"
          style={{ animationDelay: '1240ms' }}
        />
        <circle
          cx="25"
          cy="25"
          className="fadeIn"
          style={{ animationDelay: '1260ms' }}
        />
        <circle
          cx="35"
          cy="25"
          className="fadeIn"
          style={{ animationDelay: '1280ms' }}
        />
        <circle
          cx="45"
          cy="25"
          className="fadeIn"
          style={{ animationDelay: '1300ms' }}
        />
        <circle
          cx="55"
          cy="25"
          className="fadeIn"
          style={{ animationDelay: '1320ms' }}
        />
        <circle
          cx="65"
          cy="25"
          className="fadeIn"
          style={{ animationDelay: '1340ms' }}
        />
        <circle
          cx="75"
          cy="25"
          className="fadeIn"
          style={{ animationDelay: '1360ms' }}
        />
        <circle
          cx="85"
          cy="25"
          className="fadeIn"
          style={{ animationDelay: '1380ms' }}
        />
        <circle
          cx="95"
          cy="25"
          className="fadeIn"
          style={{ animationDelay: '1400ms' }}
        />
        <circle
          cx="105"
          cy="25"
          className="fadeIn"
          style={{ animationDelay: '1420ms' }}
        />
        <circle
          cx="115"
          cy="25"
          className="fadeIn"
          style={{ animationDelay: '1440ms' }}
        />
        <circle
          cx="125"
          cy="25"
          className="fadeIn"
          style={{ animationDelay: '1460ms' }}
        />
        <circle
          cx="135"
          cy="25"
          className="fadeIn"
          style={{ animationDelay: '1480ms' }}
        />
        <circle
          cx="145"
          cy="25"
          className="fadeIn"
          style={{ animationDelay: '1500ms' }}
        />
        <circle
          cx="155"
          cy="25"
          className="fadeIn"
          style={{ animationDelay: '1520ms' }}
        />
        <circle
          cx="165"
          cy="25"
          className="fadeIn"
          style={{ animationDelay: '1540ms' }}
        />
        <circle
          cx="175"
          cy="25"
          className="fadeIn"
          style={{ animationDelay: '1560ms' }}
        />
        <circle
          cx="185"
          cy="25"
          className="fadeIn"
          style={{ animationDelay: '1580ms' }}
        />
        <circle
          cx="195"
          cy="25"
          className="fadeIn"
          style={{ animationDelay: '1600ms' }}
        />
        <circle
          cx="205"
          cy="25"
          className="fadeIn"
          style={{ animationDelay: '1620ms' }}
        />
        <circle
          cx="215"
          cy="25"
          className="fadeIn"
          style={{ animationDelay: '1640ms' }}
        />
        <circle
          cx="225"
          cy="25"
          className="fadeIn"
          style={{ animationDelay: '1660ms' }}
        />
        <circle
          cx="235"
          cy="25"
          className="fadeIn"
          style={{ animationDelay: '1680ms' }}
        />
        <circle
          cx="245"
          cy="25"
          className="fadeIn"
          style={{ animationDelay: '1700ms' }}
        />
        <circle
          cx="255"
          cy="25"
          className="fadeIn"
          style={{ animationDelay: '1720ms' }}
        />
        <circle
          cx="265"
          cy="25"
          className="fadeIn"
          style={{ animationDelay: '1740ms' }}
        />
        <circle
          cx="275"
          cy="25"
          className="fadeIn"
          style={{ animationDelay: '1760ms' }}
        />
        <circle
          cx="285"
          cy="25"
          className="fadeIn"
          style={{ animationDelay: '1780ms' }}
        />
        <circle
          cx="295"
          cy="25"
          className="fadeIn"
          style={{ animationDelay: '1800ms' }}
        />
        <circle
          cx="305"
          cy="25"
          className="fadeIn"
          style={{ animationDelay: '1820ms' }}
        />
        <circle
          cx="10"
          cy="35"
          className="fadeIn"
          style={{ animationDelay: '1840ms' }}
        />
        <circle
          cx="20"
          cy="35"
          className="fadeIn"
          style={{ animationDelay: '1860ms' }}
        />
        <circle
          cx="30"
          cy="35"
          className="fadeIn"
          style={{ animationDelay: '1880ms' }}
        />
        <circle
          cx="40"
          cy="35"
          className="fadeIn"
          style={{ animationDelay: '1900ms' }}
        />
        <circle
          cx="50"
          cy="35"
          className="fadeIn"
          style={{ animationDelay: '1920ms' }}
        />
        <circle
          cx="60"
          cy="35"
          className="fadeIn"
          style={{ animationDelay: '1940ms' }}
        />
        <circle
          cx="70"
          cy="35"
          className="fadeIn"
          style={{ animationDelay: '1960ms' }}
        />
        <circle
          cx="80"
          cy="35"
          className="fadeIn"
          style={{ animationDelay: '1980ms' }}
        />
        <circle
          cx="90"
          cy="35"
          className="fadeIn"
          style={{ animationDelay: '2000ms' }}
        />
        <circle
          cx="100"
          cy="35"
          className="fadeIn"
          style={{ animationDelay: '2020ms' }}
        />
        <circle
          cx="110"
          cy="35"
          className="fadeIn"
          style={{ animationDelay: '2040ms' }}
        />
        <circle
          cx="120"
          cy="35"
          className="fadeIn"
          style={{ animationDelay: '2060ms' }}
        />
        <circle
          cx="130"
          cy="35"
          className="fadeIn"
          style={{ animationDelay: '2080ms' }}
        />
        <circle
          cx="140"
          cy="35"
          className="fadeIn"
          style={{ animationDelay: '2100ms' }}
        />
        <circle
          cx="150"
          cy="35"
          className="fadeIn"
          style={{ animationDelay: '2120ms' }}
        />
        <circle
          cx="160"
          cy="35"
          className="fadeIn"
          style={{ animationDelay: '2140ms' }}
        />
        <circle
          cx="170"
          cy="35"
          className="fadeIn"
          style={{ animationDelay: '2160ms' }}
        />
        <circle
          cx="180"
          cy="35"
          className="fadeIn"
          style={{ animationDelay: '2180ms' }}
        />
        <circle
          cx="190"
          cy="35"
          className="fadeIn"
          style={{ animationDelay: '2200ms' }}
        />
        <circle
          cx="200"
          cy="35"
          className="fadeIn"
          style={{ animationDelay: '2220ms' }}
        />
        <circle
          cx="210"
          cy="35"
          className="fadeIn"
          style={{ animationDelay: '2240ms' }}
        />
        <circle
          cx="220"
          cy="35"
          className="fadeIn"
          style={{ animationDelay: '2260ms' }}
        />
        <circle
          cx="230"
          cy="35"
          className="fadeIn"
          style={{ animationDelay: '2280ms' }}
        />
        <circle
          cx="240"
          cy="35"
          className="fadeIn"
          style={{ animationDelay: '2300ms' }}
        />
        <circle
          cx="250"
          cy="35"
          className="fadeIn"
          style={{ animationDelay: '2320ms' }}
        />
        <circle
          cx="260"
          cy="35"
          className="fadeIn"
          style={{ animationDelay: '2340ms' }}
        />
        <circle
          cx="270"
          cy="35"
          className="fadeIn"
          style={{ animationDelay: '2360ms' }}
        />
        <circle
          cx="280"
          cy="35"
          className="fadeIn"
          style={{ animationDelay: '2380ms' }}
        />
        <circle
          cx="290"
          cy="35"
          className="fadeIn"
          style={{ animationDelay: '2400ms' }}
        />
        <circle
          cx="300"
          cy="35"
          className="fadeIn"
          style={{ animationDelay: '2420ms' }}
        />
        <circle
          cx="5"
          cy="45"
          className="fadeIn"
          style={{ animationDelay: '2440ms' }}
        />
        <circle
          cx="15"
          cy="45"
          className="fadeIn"
          style={{ animationDelay: '2460ms' }}
        />
        <circle
          cx="25"
          cy="45"
          className="fadeIn"
          style={{ animationDelay: '2480ms' }}
        />
        <circle
          cx="35"
          cy="45"
          className="fadeIn"
          style={{ animationDelay: '2500ms' }}
        />
        <circle
          cx="45"
          cy="45"
          className="fadeIn"
          style={{ animationDelay: '2520ms' }}
        />
        <circle
          cx="55"
          cy="45"
          className="fadeIn"
          style={{ animationDelay: '2540ms' }}
        />
        <circle
          cx="65"
          cy="45"
          className="fadeIn"
          style={{ animationDelay: '2560ms' }}
        />
        <circle
          cx="75"
          cy="45"
          className="fadeIn"
          style={{ animationDelay: '2580ms' }}
        />
        <circle
          cx="85"
          cy="45"
          className="fadeIn"
          style={{ animationDelay: '2600ms' }}
        />
        <circle
          cx="95"
          cy="45"
          className="fadeIn"
          style={{ animationDelay: '2620ms' }}
        />
        <circle
          cx="105"
          cy="45"
          className="fadeIn"
          style={{ animationDelay: '2640ms' }}
        />
        <circle
          cx="115"
          cy="45"
          className="fadeIn"
          style={{ animationDelay: '2660ms' }}
        />
        <circle
          cx="125"
          cy="45"
          className="fadeIn"
          style={{ animationDelay: '2680ms' }}
        />
        <circle
          cx="135"
          cy="45"
          className="fadeIn"
          style={{ animationDelay: '2700ms' }}
        />
        <circle
          cx="145"
          cy="45"
          className="fadeIn"
          style={{ animationDelay: '2720ms' }}
        />
        <circle
          cx="155"
          cy="45"
          className="fadeIn"
          style={{ animationDelay: '2740ms' }}
        />
        <circle
          cx="165"
          cy="45"
          className="fadeIn"
          style={{ animationDelay: '2760ms' }}
        />
        <circle
          cx="175"
          cy="45"
          className="fadeIn"
          style={{ animationDelay: '2780ms' }}
        />
        <circle
          cx="185"
          cy="45"
          className="fadeIn"
          style={{ animationDelay: '2800ms' }}
        />
        <circle
          cx="195"
          cy="45"
          className="fadeIn"
          style={{ animationDelay: '2820ms' }}
        />
        <circle
          cx="205"
          cy="45"
          className="fadeIn"
          style={{ animationDelay: '2840ms' }}
        />
        <circle
          cx="215"
          cy="45"
          className="fadeIn"
          style={{ animationDelay: '2860ms' }}
        />
        <circle
          cx="225"
          cy="45"
          className="fadeIn"
          style={{ animationDelay: '2880ms' }}
        />
        <circle
          cx="235"
          cy="45"
          className="fadeIn"
          style={{ animationDelay: '2900ms' }}
        />
        <circle
          cx="245"
          cy="45"
          className="fadeIn"
          style={{ animationDelay: '2920ms' }}
        />
        <circle
          cx="255"
          cy="45"
          className="fadeIn"
          style={{ animationDelay: '2940ms' }}
        />
        <circle
          cx="265"
          cy="45"
          className="fadeIn"
          style={{ animationDelay: '2960ms' }}
        />
        <circle
          cx="275"
          cy="45"
          className="fadeIn"
          style={{ animationDelay: '2980ms' }}
        />
        <circle
          cx="285"
          cy="45"
          className="fadeIn"
          style={{ animationDelay: '3000ms' }}
        />
        <circle
          cx="295"
          cy="45"
          className="fadeIn"
          style={{ animationDelay: '3020ms' }}
        />
        <circle
          cx="305"
          cy="45"
          className="fadeIn"
          style={{ animationDelay: '3040ms' }}
        />
        <circle
          cx="10"
          cy="55"
          className="fadeIn"
          style={{ animationDelay: '3060ms' }}
        />
        <circle
          cx="20"
          cy="55"
          className="fadeIn"
          style={{ animationDelay: '3080ms' }}
        />
        <circle
          cx="30"
          cy="55"
          className="fadeIn"
          style={{ animationDelay: '3100ms' }}
        />
        <circle
          cx="40"
          cy="55"
          className="fadeIn"
          style={{ animationDelay: '3120ms' }}
        />
        <circle
          cx="50"
          cy="55"
          className="fadeIn"
          style={{ animationDelay: '3140ms' }}
        />
        <circle
          cx="60"
          cy="55"
          className="fadeIn"
          style={{ animationDelay: '3160ms' }}
        />
        <circle
          cx="70"
          cy="55"
          className="fadeIn"
          style={{ animationDelay: '3180ms' }}
        />
        <circle
          cx="80"
          cy="55"
          className="fadeIn"
          style={{ animationDelay: '3200ms' }}
        />
        <circle
          cx="90"
          cy="55"
          className="fadeIn"
          style={{ animationDelay: '3220ms' }}
        />
        <circle
          cx="100"
          cy="55"
          className="fadeIn"
          style={{ animationDelay: '3240ms' }}
        />
        <circle
          cx="110"
          cy="55"
          className="fadeIn"
          style={{ animationDelay: '3260ms' }}
        />
        <circle
          cx="120"
          cy="55"
          className="fadeIn"
          style={{ animationDelay: '3280ms' }}
        />
        <circle
          cx="130"
          cy="55"
          className="fadeIn"
          style={{ animationDelay: '3300ms' }}
        />
        <circle
          cx="140"
          cy="55"
          className="fadeIn"
          style={{ animationDelay: '3320ms' }}
        />
        <circle
          cx="150"
          cy="55"
          className="fadeIn"
          style={{ animationDelay: '3340ms' }}
        />
        <circle
          cx="160"
          cy="55"
          className="fadeIn"
          style={{ animationDelay: '3360ms' }}
        />
        <circle
          cx="170"
          cy="55"
          className="fadeIn"
          style={{ animationDelay: '3380ms' }}
        />
        <circle
          cx="180"
          cy="55"
          className="fadeIn"
          style={{ animationDelay: '3400ms' }}
        />
        <circle
          cx="190"
          cy="55"
          className="fadeIn"
          style={{ animationDelay: '3420ms' }}
        />
        <circle
          cx="200"
          cy="55"
          className="fadeIn"
          style={{ animationDelay: '3440ms' }}
        />
        <circle
          cx="210"
          cy="55"
          className="fadeIn"
          style={{ animationDelay: '3460ms' }}
        />
        <circle
          cx="220"
          cy="55"
          className="fadeIn"
          style={{ animationDelay: '3480ms' }}
        />
        <circle
          cx="230"
          cy="55"
          className="fadeIn"
          style={{ animationDelay: '3500ms' }}
        />
        <circle
          cx="240"
          cy="55"
          className="fadeIn"
          style={{ animationDelay: '3520ms' }}
        />
        <circle
          cx="250"
          cy="55"
          className="fadeIn"
          style={{ animationDelay: '3540ms' }}
        />
        <circle
          cx="260"
          cy="55"
          className="fadeIn"
          style={{ animationDelay: '3560ms' }}
        />
        <circle
          cx="270"
          cy="55"
          className="fadeIn"
          style={{ animationDelay: '3580ms' }}
        />
        <circle
          cx="280"
          cy="55"
          className="fadeIn"
          style={{ animationDelay: '3600ms' }}
        />
        <circle
          cx="290"
          cy="55"
          className="fadeIn"
          style={{ animationDelay: '3620ms' }}
        />
        <circle
          cx="300"
          cy="55"
          className="fadeIn"
          style={{ animationDelay: '3640ms' }}
        />
        <circle
          cx="5"
          cy="65"
          className="fadeIn"
          style={{ animationDelay: '3660ms' }}
        />
        <circle
          cx="15"
          cy="65"
          className="fadeIn"
          style={{ animationDelay: '3680ms' }}
        />
        <circle
          cx="25"
          cy="65"
          className="fadeIn"
          style={{ animationDelay: '3700ms' }}
        />
        <circle
          cx="35"
          cy="65"
          className="fadeIn"
          style={{ animationDelay: '3720ms' }}
        />
        <circle
          cx="45"
          cy="65"
          className="fadeIn"
          style={{ animationDelay: '3740ms' }}
        />
        <circle
          cx="55"
          cy="65"
          className="fadeIn"
          style={{ animationDelay: '3760ms' }}
        />
        <circle
          cx="65"
          cy="65"
          className="fadeIn"
          style={{ animationDelay: '3780ms' }}
        />
        <circle
          cx="75"
          cy="65"
          className="fadeIn"
          style={{ animationDelay: '3800ms' }}
        />
        <circle
          cx="85"
          cy="65"
          className="fadeIn"
          style={{ animationDelay: '3820ms' }}
        />
        <circle
          cx="95"
          cy="65"
          className="fadeIn"
          style={{ animationDelay: '3840ms' }}
        />
        <circle
          cx="105"
          cy="65"
          className="fadeIn"
          style={{ animationDelay: '3860ms' }}
        />
        <circle
          cx="115"
          cy="65"
          className="fadeIn"
          style={{ animationDelay: '3880ms' }}
        />
        <circle
          cx="125"
          cy="65"
          className="fadeIn"
          style={{ animationDelay: '3900ms' }}
        />
        <circle
          cx="135"
          cy="65"
          className="fadeIn"
          style={{ animationDelay: '3920ms' }}
        />
        <circle
          cx="145"
          cy="65"
          className="fadeIn"
          style={{ animationDelay: '3940ms' }}
        />
        <circle
          cx="155"
          cy="65"
          className="fadeIn"
          style={{ animationDelay: '3960ms' }}
        />
        <circle
          cx="165"
          cy="65"
          className="fadeIn"
          style={{ animationDelay: '3980ms' }}
        />
        <circle
          cx="175"
          cy="65"
          className="fadeIn"
          style={{ animationDelay: '4000ms' }}
        />
        <circle
          cx="185"
          cy="65"
          className="fadeIn"
          style={{ animationDelay: '4020ms' }}
        />
        <circle
          cx="195"
          cy="65"
          className="fadeIn"
          style={{ animationDelay: '4040ms' }}
        />
        <circle
          cx="205"
          cy="65"
          className="fadeIn"
          style={{ animationDelay: '4060ms' }}
        />
        <circle
          cx="215"
          cy="65"
          className="fadeIn"
          style={{ animationDelay: '4080ms' }}
        />
        <circle
          cx="225"
          cy="65"
          className="fadeIn"
          style={{ animationDelay: '4100ms' }}
        />
        <circle
          cx="235"
          cy="65"
          className="fadeIn"
          style={{ animationDelay: '4120ms' }}
        />
        <circle
          cx="245"
          cy="65"
          className="fadeIn"
          style={{ animationDelay: '4140ms' }}
        />
        <circle
          cx="255"
          cy="65"
          className="fadeIn"
          style={{ animationDelay: '4160ms' }}
        />
        <circle
          cx="265"
          cy="65"
          className="fadeIn"
          style={{ animationDelay: '4180ms' }}
        />
        <circle
          cx="275"
          cy="65"
          className="fadeIn"
          style={{ animationDelay: '4200ms' }}
        />
        <circle
          cx="285"
          cy="65"
          className="fadeIn"
          style={{ animationDelay: '4220ms' }}
        />
        <circle
          cx="295"
          cy="65"
          className="fadeIn"
          style={{ animationDelay: '4240ms' }}
        />
        <circle
          cx="305"
          cy="65"
          className="fadeIn"
          style={{ animationDelay: '4260ms' }}
        />
        <circle
          cx="5"
          cy="75"
          className="fadeIn"
          style={{ animationDelay: '4280ms' }}
        />
        <circle
          cx="15"
          cy="75"
          className="fadeIn"
          style={{ animationDelay: '4300ms' }}
        />
        <circle
          cx="25"
          cy="75"
          className="fadeIn"
          style={{ animationDelay: '4320ms' }}
        />
        <circle
          cx="35"
          cy="75"
          className="fadeIn"
          style={{ animationDelay: '4340ms' }}
        />
        <circle
          cx="45"
          cy="75"
          className="fadeIn"
          style={{ animationDelay: '4360ms' }}
        />
        <circle
          cx="55"
          cy="75"
          className="fadeIn"
          style={{ animationDelay: '4380ms' }}
        />
        <circle
          cx="65"
          cy="75"
          className="fadeIn"
          style={{ animationDelay: '4400ms' }}
        />
        <circle
          cx="75"
          cy="75"
          className="fadeIn"
          style={{ animationDelay: '4420ms' }}
        />
        <circle
          cx="85"
          cy="75"
          className="fadeIn"
          style={{ animationDelay: '4440ms' }}
        />
        <circle
          cx="95"
          cy="75"
          className="fadeIn"
          style={{ animationDelay: '4460ms' }}
        />
        <circle
          cx="105"
          cy="75"
          className="fadeIn"
          style={{ animationDelay: '4480ms' }}
        />
        <circle
          cx="115"
          cy="75"
          className="fadeIn"
          style={{ animationDelay: '4500ms' }}
        />
        <circle
          cx="125"
          cy="75"
          className="fadeIn"
          style={{ animationDelay: '4520ms' }}
        />
        <circle
          cx="135"
          cy="75"
          className="fadeIn"
          style={{ animationDelay: '4540ms' }}
        />
        <circle
          cx="145"
          cy="75"
          className="fadeIn"
          style={{ animationDelay: '4560ms' }}
        />
        <circle
          cx="155"
          cy="75"
          className="fadeIn"
          style={{ animationDelay: '4580ms' }}
        />
        <circle
          cx="165"
          cy="75"
          className="fadeIn"
          style={{ animationDelay: '4600ms' }}
        />
        <circle
          cx="175"
          cy="75"
          className="fadeIn"
          style={{ animationDelay: '4620ms' }}
        />
        <circle
          cx="185"
          cy="75"
          className="fadeIn"
          style={{ animationDelay: '4640ms' }}
        />
        <circle
          cx="195"
          cy="75"
          className="fadeIn"
          style={{ animationDelay: '4660ms' }}
        />
        <circle
          cx="205"
          cy="75"
          className="fadeIn"
          style={{ animationDelay: '4680ms' }}
        />
        <circle
          cx="215"
          cy="75"
          className="fadeIn"
          style={{ animationDelay: '4700ms' }}
        />
        <circle
          cx="225"
          cy="75"
          className="fadeIn"
          style={{ animationDelay: '4720ms' }}
        />
        <circle
          cx="235"
          cy="75"
          className="fadeIn"
          style={{ animationDelay: '4740ms' }}
        />
        <circle
          cx="245"
          cy="75"
          className="fadeIn"
          style={{ animationDelay: '4760ms' }}
        />
        <circle
          cx="255"
          cy="75"
          className="fadeIn"
          style={{ animationDelay: '4780ms' }}
        />
        <circle
          cx="265"
          cy="75"
          className="fadeIn"
          style={{ animationDelay: '4800ms' }}
        />
        <circle
          cx="275"
          cy="75"
          className="fadeIn"
          style={{ animationDelay: '4820ms' }}
        />
        <circle
          cx="285"
          cy="75"
          className="fadeIn"
          style={{ animationDelay: '4840ms' }}
        />
        <circle
          cx="295"
          cy="75"
          className="fadeIn"
          style={{ animationDelay: '4860ms' }}
        />
        <circle
          cx="305"
          cy="75"
          className="fadeIn"
          style={{ animationDelay: '4880ms' }}
        />
        <circle
          cx="10"
          cy="85"
          className="fadeIn"
          style={{ animationDelay: '4900ms' }}
        />
        <circle
          cx="20"
          cy="85"
          className="fadeIn"
          style={{ animationDelay: '4920ms' }}
        />
        <circle
          cx="30"
          cy="85"
          className="fadeIn"
          style={{ animationDelay: '4940ms' }}
        />
        <circle
          cx="40"
          cy="85"
          className="fadeIn"
          style={{ animationDelay: '4960ms' }}
        />
        <circle
          cx="50"
          cy="85"
          className="fadeIn"
          style={{ animationDelay: '4980ms' }}
        />
        <circle
          cx="60"
          cy="85"
          className="fadeIn"
          style={{ animationDelay: '5000ms' }}
        />
        <circle
          cx="70"
          cy="85"
          className="fadeIn"
          style={{ animationDelay: '5020ms' }}
        />
        <circle
          cx="80"
          cy="85"
          className="fadeIn"
          style={{ animationDelay: '5040ms' }}
        />
        <circle
          cx="90"
          cy="85"
          className="fadeIn"
          style={{ animationDelay: '5060ms' }}
        />
        <circle
          cx="100"
          cy="85"
          className="fadeIn"
          style={{ animationDelay: '5080ms' }}
        />
        <circle
          cx="110"
          cy="85"
          className="fadeIn"
          style={{ animationDelay: '5100ms' }}
        />
        <circle
          cx="120"
          cy="85"
          className="fadeIn"
          style={{ animationDelay: '5120ms' }}
        />
        <circle
          cx="130"
          cy="85"
          className="fadeIn"
          style={{ animationDelay: '5140ms' }}
        />
        <circle
          cx="140"
          cy="85"
          className="fadeIn"
          style={{ animationDelay: '5160ms' }}
        />
        <circle
          cx="150"
          cy="85"
          className="fadeIn"
          style={{ animationDelay: '5180ms' }}
        />
        <circle
          cx="160"
          cy="85"
          className="fadeIn"
          style={{ animationDelay: '5200ms' }}
        />
        <circle
          cx="170"
          cy="85"
          className="fadeIn"
          style={{ animationDelay: '5220ms' }}
        />
        <circle
          cx="180"
          cy="85"
          className="fadeIn"
          style={{ animationDelay: '5240ms' }}
        />
        <circle
          cx="190"
          cy="85"
          className="fadeIn"
          style={{ animationDelay: '5260ms' }}
        />
        <circle
          cx="200"
          cy="85"
          className="fadeIn"
          style={{ animationDelay: '5280ms' }}
        />
        <circle
          cx="210"
          cy="85"
          className="fadeIn"
          style={{ animationDelay: '5300ms' }}
        />
        <circle
          cx="220"
          cy="85"
          className="fadeIn"
          style={{ animationDelay: '5320ms' }}
        />
        <circle
          cx="230"
          cy="85"
          className="fadeIn"
          style={{ animationDelay: '5340ms' }}
        />
        <circle
          cx="240"
          cy="85"
          className="fadeIn"
          style={{ animationDelay: '5360ms' }}
        />
        <circle
          cx="250"
          cy="85"
          className="fadeIn"
          style={{ animationDelay: '5380ms' }}
        />
        <circle
          cx="260"
          cy="85"
          className="fadeIn"
          style={{ animationDelay: '5400ms' }}
        />
        <circle
          cx="270"
          cy="85"
          className="fadeIn"
          style={{ animationDelay: '5420ms' }}
        />
        <circle
          cx="280"
          cy="85"
          className="fadeIn"
          style={{ animationDelay: '5440ms' }}
        />
        <circle
          cx="290"
          cy="85"
          className="fadeIn"
          style={{ animationDelay: '5460ms' }}
        />
        <circle
          cx="300"
          cy="85"
          className="fadeIn"
          style={{ animationDelay: '5480ms' }}
        />
        <circle
          cx="5"
          cy="95"
          className="fadeIn"
          style={{ animationDelay: '5500ms' }}
        />
        <circle
          cx="15"
          cy="95"
          className="fadeIn"
          style={{ animationDelay: '5520ms' }}
        />
        <circle
          cx="25"
          cy="95"
          className="fadeIn"
          style={{ animationDelay: '5540ms' }}
        />
        <circle
          cx="35"
          cy="95"
          className="fadeIn"
          style={{ animationDelay: '5560ms' }}
        />
        <circle
          cx="45"
          cy="95"
          className="fadeIn"
          style={{ animationDelay: '5580ms' }}
        />
        <circle
          cx="55"
          cy="95"
          className="fadeIn"
          style={{ animationDelay: '5600ms' }}
        />
        <circle
          cx="65"
          cy="95"
          className="fadeIn"
          style={{ animationDelay: '5620ms' }}
        />
        <circle
          cx="75"
          cy="95"
          className="fadeIn"
          style={{ animationDelay: '5640ms' }}
        />
        <circle
          cx="85"
          cy="95"
          className="fadeIn"
          style={{ animationDelay: '5660ms' }}
        />
        <circle
          cx="95"
          cy="95"
          className="fadeIn"
          style={{ animationDelay: '5680ms' }}
        />
        <circle
          cx="105"
          cy="95"
          className="fadeIn"
          style={{ animationDelay: '5700ms' }}
        />
        <circle
          cx="115"
          cy="95"
          className="fadeIn"
          style={{ animationDelay: '5720ms' }}
        />
        <circle
          cx="125"
          cy="95"
          className="fadeIn"
          style={{ animationDelay: '5740ms' }}
        />
        <circle
          cx="135"
          cy="95"
          className="fadeIn"
          style={{ animationDelay: '5760ms' }}
        />
        <circle
          cx="145"
          cy="95"
          className="fadeIn"
          style={{ animationDelay: '5780ms' }}
        />
        <circle
          cx="155"
          cy="95"
          className="fadeIn"
          style={{ animationDelay: '5800ms' }}
        />
        <circle
          cx="165"
          cy="95"
          className="fadeIn"
          style={{ animationDelay: '5820ms' }}
        />
        <circle
          cx="175"
          cy="95"
          className="fadeIn"
          style={{ animationDelay: '5840ms' }}
        />
        <circle
          cx="185"
          cy="95"
          className="fadeIn"
          style={{ animationDelay: '5860ms' }}
        />
        <circle
          cx="195"
          cy="95"
          className="fadeIn"
          style={{ animationDelay: '5880ms' }}
        />
        <circle
          cx="205"
          cy="95"
          className="fadeIn"
          style={{ animationDelay: '5900ms' }}
        />
        <circle
          cx="215"
          cy="95"
          className="fadeIn"
          style={{ animationDelay: '5920ms' }}
        />
        <circle
          cx="225"
          cy="95"
          className="fadeIn"
          style={{ animationDelay: '5940ms' }}
        />
        <circle
          cx="235"
          cy="95"
          className="fadeIn"
          style={{ animationDelay: '5960ms' }}
        />
        <circle
          cx="245"
          cy="95"
          className="fadeIn"
          style={{ animationDelay: '5980ms' }}
        />
        <circle
          cx="255"
          cy="95"
          className="fadeIn"
          style={{ animationDelay: '6000ms' }}
        />
        <circle
          cx="265"
          cy="95"
          className="fadeIn"
          style={{ animationDelay: '6020ms' }}
        />
        <circle
          cx="275"
          cy="95"
          className="fadeIn"
          style={{ animationDelay: '6040ms' }}
        />
        <circle
          cx="285"
          cy="95"
          className="fadeIn"
          style={{ animationDelay: '6060ms' }}
        />
        <circle
          cx="295"
          cy="95"
          className="fadeIn"
          style={{ animationDelay: '6080ms' }}
        />
        <circle
          cx="305"
          cy="95"
          className="fadeIn"
          style={{ animationDelay: '6100ms' }}
        />
        <circle
          cx="10"
          cy="105"
          className="fadeIn"
          style={{ animationDelay: '6120ms' }}
        />
        <circle
          cx="20"
          cy="105"
          className="fadeIn"
          style={{ animationDelay: '6140ms' }}
        />
        <circle
          cx="30"
          cy="105"
          className="fadeIn"
          style={{ animationDelay: '6160ms' }}
        />
        <circle
          cx="40"
          cy="105"
          className="fadeIn"
          style={{ animationDelay: '6180ms' }}
        />
        <circle
          cx="50"
          cy="105"
          className="fadeIn"
          style={{ animationDelay: '6200ms' }}
        />
        <circle
          cx="60"
          cy="105"
          className="fadeIn"
          style={{ animationDelay: '6220ms' }}
        />
        <circle
          cx="70"
          cy="105"
          className="fadeIn"
          style={{ animationDelay: '6240ms' }}
        />
        <circle
          cx="80"
          cy="105"
          className="fadeIn"
          style={{ animationDelay: '6260ms' }}
        />
        <circle
          cx="90"
          cy="105"
          className="fadeIn"
          style={{ animationDelay: '6280ms' }}
        />
        <circle
          cx="100"
          cy="105"
          className="fadeIn"
          style={{ animationDelay: '6300ms' }}
        />
        <circle
          cx="110"
          cy="105"
          className="fadeIn"
          style={{ animationDelay: '6320ms' }}
        />
        <circle
          cx="120"
          cy="105"
          className="fadeIn"
          style={{ animationDelay: '6340ms' }}
        />
        <circle
          cx="130"
          cy="105"
          className="fadeIn"
          style={{ animationDelay: '6360ms' }}
        />
        <circle
          cx="140"
          cy="105"
          className="fadeIn"
          style={{ animationDelay: '6380ms' }}
        />
        <circle
          cx="150"
          cy="105"
          className="fadeIn"
          style={{ animationDelay: '6400ms' }}
        />
        <circle
          cx="160"
          cy="105"
          className="fadeIn"
          style={{ animationDelay: '6420ms' }}
        />
        <circle
          cx="170"
          cy="105"
          className="fadeIn"
          style={{ animationDelay: '6440ms' }}
        />
        <circle
          cx="180"
          cy="105"
          className="fadeIn"
          style={{ animationDelay: '6460ms' }}
        />
        <circle
          cx="190"
          cy="105"
          className="fadeIn"
          style={{ animationDelay: '6480ms' }}
        />
        <circle
          cx="200"
          cy="105"
          className="fadeIn"
          style={{ animationDelay: '6500ms' }}
        />
        <circle
          cx="210"
          cy="105"
          className="blink"
          style={{ animationDelay: '6620ms' }}
        />
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
