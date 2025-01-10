'use client'

import { Card, Pagination, LoadingContainer } from '@/components'
import { useSearchList } from './hook'
import { useCallback, useMemo, useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const { data, isLoading } = useSearchList(page, pageSize)
  const onPageChange = useCallback((page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
  }, [])

  const total = useMemo(() => {
    return data?.records?.length || 0
  }, [data?.records])

  return (
    <>
      <LoadingContainer isLoading={isLoading}>
        <div className="flex gap-4 flex-wrap columns-3xs sm:columns-2 md:columns-3">
          {data?.records?.map(({ code, title, thumb }) => (
            <Link
              href={`/${code}`}
              key={code}
            >
              <Card
                src={thumb}
                title={title}
                otherInfo={''}
              />
            </Link>
          ))}
        </div>
      </LoadingContainer>

      <Pagination
        totalPages={Math.ceil(total / pageSize)}
        currentPage={page}
        onPageChange={onPageChange}
        pageSize={pageSize}
      />
    </>
  )
}
