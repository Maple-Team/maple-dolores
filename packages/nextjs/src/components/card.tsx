import Image from 'next/image'
interface Props {
  src: string
  title: string
  tags?: string[]
  otherInfo: string
}

export const Card = ({ src, title, tags }: Props) => {
  return (
    <div className="p-4 bg-gray-100 rounded-md flex flex-col items-center justify-center gap-2 hover:shadow-lg">
      <Image
        src={src}
        alt={title}
        width={200}
      />
      <p>{title || 'info'}</p>
      <p>{tags} tags</p>
      <p>其他信息</p>
    </div>
  )
}
