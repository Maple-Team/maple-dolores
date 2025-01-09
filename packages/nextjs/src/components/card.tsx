import Image from 'next/image'
interface Props {
  src?: string
  title: string
  tags?: string[]
  otherInfo: string
}

export const Card = ({ src, title, tags }: Props) => {
  return (
    <div className="p-4 bg-gray-100 w-[160px] rounded-md flex flex-col items-center justify-center gap-2 hover:shadow-lg">
      <Image
        src={'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'}
        alt={title}
        width={147}
        height={200}
      />
      <p>{title || 'info'}</p>
      <p>{tags} tags</p>
      <p>其他信息</p>
    </div>
  )
}
