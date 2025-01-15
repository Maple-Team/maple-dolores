'use client'

import { LoadingContainer } from '@/components'
import { useActressList, useExistActressList } from './hook'
import Image from 'next/image'
import Link from 'next/link'

export default function ActressList() {
  const { data, isLoading } = useActressList()
  const { data: existData } = useExistActressList()
  return (
    <LoadingContainer isLoading={isLoading}>
      <div className="grid grid-cols-8 gap-4">
        {data?.records
          ?.filter((item) => existData?.includes(item.name))
          .map(({ name, avatar }) => {
            const encodeUrl = encodeURIComponent(`http://localhost:60462/${avatar}` || '')
            const src = `http://localhost:4003/api/proxy?url=${encodeUrl}&responseType=arraybuffer`
            return (
              <Link
                href={`/actress/${name}`}
                key={name}
              >
                <div className="flex flex-col items-center justify-center gap-2 hover:shadow-lg">
                  <Image
                    src={src}
                    alt={name}
                    width={147}
                    height={200}
                  />
                  <p className="text-blue-700">{name}</p>
                </div>
              </Link>
            )
          })}
      </div>
    </LoadingContainer>
  )
}
