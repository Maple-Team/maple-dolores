import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const CommonHeader = () => {
  const pathname = usePathname()

  return (
    <div className="py-2 flex items-center">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="logo"
          width={100}
          height={30}
        />
      </Link>
      <input placeholder="Search" />
      <Link
        className={`mx-2 ${pathname === '/series' ? 'text-blue-500' : ''}`}
        href="/series"
      >
        Series
      </Link>
      <Link
        className={`mx-2 ${pathname === '/actresses' ? 'text-blue-500' : ''}`}
        href="/actresses"
      >
        Actress
      </Link>
    </div>
  )
}
