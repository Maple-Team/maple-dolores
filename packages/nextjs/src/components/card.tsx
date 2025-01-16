import { Video } from '@/app/type'
import Image from 'next/image'
import { map } from '@/utils/contant'

export const Card = ({ title, tags, code, previews }: Video) => {
  const [ser, no] = code.toLowerCase().split('-')
  // @ts-expect-error: xx
  const prefix = map[ser]
  const file = `${prefix}${ser}${no}`
  // https://pics.dmm.co.jp/mono/movie/adult/ipz573/ipz573ps.jpg
  // https://pics.dmm.co.jp/digital/video/avop00127/avop00127-1.jpg
  const fileUrl = `https://pics.dmm.co.jp/mono/movie/adult/${file}/${file}ps.jpg`
  const encodeUrl = encodeURIComponent(fileUrl)
  //   const fileUrl2 = `https://pics.dmm.co.jp/mono/movie/adult/${file}/${file}pl.jpg`
  //   const encodeUrl2 = encodeURIComponent(fileUrl2)
  //   console.log(code, fileUrl, encodeUrl)
  return (
    <div className="p-4 bg-gray-100 text-emerald-300 w-[160px] rounded-md flex flex-col items-center justify-center gap-2 hover:shadow-lg">
      {previews?.map((preview) => {
        const previewUrl = `http://localhost:4003/api/proxy?url=${encodeURIComponent(preview)}&responseType=arraybuffer`
        return (
          <Image
            key={preview}
            src={previewUrl}
            alt={title}
            width={50}
            height={70}
          />
        )
      })}
      <Image
        src={`http://localhost:4003/api/proxy?url=${encodeUrl}&responseType=arraybuffer`}
        alt={title}
        width={147}
        height={200}
        className="rounded-md"
      />
      <p>{title}</p>
      <p>{tags}</p>
      <p>{code}</p>
    </div>
  )
}
