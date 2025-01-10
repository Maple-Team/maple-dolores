'use client'

import {
  //  useRouter, useSearchParams,
  useParams,
} from 'next/navigation'
import { useVideoDetail } from './hook'
import Image from 'next/image'

export default function VideoDetail() {
  const params = useParams()
  //   const router = useRouter()
  //   const searchParams = useSearchParams()
  //   const abc = searchParams.get('abc')
  const code = params?.slug
  const { data, isLoading } = useVideoDetail(code)

  return (
    <div className="grid grid-cols-8 gap-4">
      <h1 className="col-span-8">{data?.title}</h1>
      <Image
        src={data?.cover || ''}
        alt={data?.title || ''}
        className="col-span-5 w-full"
        height={400}
      />
      <div className="col-span-3">{JSON.stringify(data)}</div>
      {data?.previews?.map((url: string) => (
        <Image
          className="col-span-1"
          key={url}
          src={url || ''}
          alt={data.title || ''}
          width={200}
          height={100}
        />
      ))}
      <div className="col-span-8">video component</div>
    </div>
  )
}
