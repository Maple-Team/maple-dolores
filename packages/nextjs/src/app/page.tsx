'use client'

import { Card, Pagination } from '@/components'
import { useSearchList } from './hook'

export default function Home() {
  const { data } = useSearchList()
  console.log(data)
  return (
    <>
      <div className="flex gap-4 flex-wrap columns-3xs sm:columns-2 md:columns-3">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card
            key={i}
            src={''}
            title={'aaa'}
            otherInfo={''}
          />
        ))}
      </div>
      <Pagination />
    </>
  )
}
