'use client'

import {
  //  useRouter, useSearchParams,
  useParams,
} from 'next/navigation'

import Image from 'next/image'
import { Card, LoadingContainer, Pagination } from '@/components'
import { useSearchList } from '@/app/hook'
import { useCallback, useState } from 'react'
import Link from 'next/link'

export default function VideoDetail() {
  const params = useParams()
  const actress = decodeURIComponent(params?.slug as string)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(500)

  const { data, isLoading } = useSearchList(page, pageSize, actress)
  const onPageChange = useCallback((page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
  }, [])
  return (
    <LoadingContainer isLoading={isLoading}>
      <div className="grid grid-cols-8 gap-4 text-blue-600">{actress}</div>
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
      <Pagination
        totalPages={Math.ceil((data?.pagination.total || 0) / pageSize)}
        currentPage={page}
        onPageChange={onPageChange}
        pageSize={pageSize}
      />
    </LoadingContainer>
  )
}
