'use client'

import { Card, Pagination } from '@/components'
import { useSearchList } from './hook'

export default function Home() {
  const { data, isLoading } = useSearchList()
  console.log(data, isLoading)
  return (
    <>
      <div className="flex gap-4 flex-wrap columns-3xs sm:columns-2 md:columns-3">
        {data?.records?.map(({ code, title, thumb }) => (
          <Card
            key={code}
            src={thumb}
            title={title}
            otherInfo={''}
          />
        ))}
      </div>
      <Pagination />
    </>
  )
}
