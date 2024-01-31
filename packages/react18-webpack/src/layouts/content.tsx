import type { ReactNode } from 'react'
import React from 'react'

export const ContentContainer = ({ children, classNames }: { children: ReactNode; classNames?: string }) => {
  return <div className={`my-4 p-4 bg-white ${classNames ?? ''}`}>{children}</div>
}
