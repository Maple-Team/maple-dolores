import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'

export const LoadingContainer = ({ children, isLoading }: { children: ReactNode; isLoading: boolean }) => {
  const [showLoading, setShowLoading] = useState(isLoading)

  useEffect(() => {
    setShowLoading(isLoading)
  }, [isLoading])

  return (
    <div className="relative">
      {children}
      {showLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-10">
          <div className="animate-spin rounded-full border-t-2 border-b-2 border-gray-900 h-8 w-8"></div>
        </div>
      )}
    </div>
  )
}
