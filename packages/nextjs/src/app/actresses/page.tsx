'use client'

import { useActressList } from './hook'
import Image from 'next/image'

export default function ActressList() {
  const { data } = useActressList()

  return (
    <div className="grid grid-cols-8 gap-4">
      {data?.map(({ name, avatar }) => (
        <div
          key={name}
          className="flex flex-col items-center justify-center gap-2 hover:shadow-lg"
        >
          <Image
            src={avatar || ''}
            alt={name}
            width={147}
            height={200}
          />
          <p>{name}</p>
        </div>
      ))}
    </div>
  )
}
