'use client'

import {
  //  useRouter, useSearchParams,
  useParams,
} from 'next/navigation'
import { useVideoDetail } from './hook'
import Image from 'next/image'
import { LoadingContainer } from '@/components'
import { map } from '@/utils/contant'
import Link from 'next/link'

export default function VideoDetail() {
  const params = useParams()
  //   const router = useRouter()
  //   const searchParams = useSearchParams()
  //   const abc = searchParams.get('abc')
  const code = params?.slug as string
  const { data, isLoading } = useVideoDetail(code)
  const [ser, no] = code?.toLowerCase().split('-')
  // @ts-expect-error: xx
  const prefix = map[ser]
  const file = `${prefix}${ser}${no}`
  const fileUrl2 = `https://pics.dmm.co.jp/mono/movie/adult/${file}/${file}pl.jpg`
  const encodeUrl2 = encodeURIComponent(fileUrl2)
  console.log(code, fileUrl2, encodeUrl2)
  return (
    <LoadingContainer isLoading={isLoading}>
      <div className="grid grid-cols-8 gap-4">
        <h1 className="col-span-8">{data?.title}</h1>
        <Image
          src={`http://localhost:4003/api/proxy?url=${encodeUrl2}&responseType=arraybuffer`}
          alt={data?.title || ''}
          className="col-span-6 w-full"
          height={554}
          width={824}
        />
        <div className="col-span-2 text-blue-500">
          <p>識別碼: {data?.code}</p>
          <p>發行日期: {data?.date}</p>
          <p>{data?.tags}</p>
          <p>
            演員:{' '}
            {data?.actresses?.map((actress: string) => {
              return (
                <Link
                  href={`/actress/${actress}`}
                  key={actress}
                  className="px-1"
                >
                  {actress}
                </Link>
              )
            })}
          </p>
        </div>
        {data?.previews?.map((url: string) => {
          const previewUrl = `http://localhost:4003/api/proxy?url=${encodeURIComponent(url)}&responseType=arraybuffer`

          return (
            <Image
              className="col-span-1"
              key={url}
              src={previewUrl}
              alt={data.title || ''}
              width={200}
              height={120}
            />
          )
        })}
        <div className="col-span-8">video component</div>
      </div>
    </LoadingContainer>
  )
}
