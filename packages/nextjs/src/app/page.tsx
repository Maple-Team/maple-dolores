'use client'

import { Card, Pagination, LoadingContainer } from '@/components'
import { useSearchList } from './hook'
import { useCallback, useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(500)
  const { data, isLoading } = useSearchList(page, pageSize)
  const onPageChange = useCallback((page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
  }, [])

  return (
    <>
      <LoadingContainer isLoading={isLoading}>
        <div className="flex gap-4 flex-wrap columns-3xs sm:columns-2 md:columns-3">
          {data?.records?.map(({ code, title, thumb, ...rest }) => (
            <Link
              href={`/${code}`}
              key={code}
            >
              <Card
                thumb={thumb}
                title={title}
                code={code}
                {...rest}
              />
            </Link>
          ))}
        </div>
      </LoadingContainer>

      <Pagination
        totalPages={Math.ceil(data?.pagination.total || 0 / pageSize)}
        currentPage={page}
        onPageChange={onPageChange}
        pageSize={pageSize}
      />
    </>
  )
}
