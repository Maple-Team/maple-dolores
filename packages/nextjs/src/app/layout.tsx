'use client'

import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { CommonHeader, CommonFooter } from '../components'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-slate-200`}
      >
        <QueryClientProvider client={queryClient}>
          <CommonHeader />
          <div className="flex-1 px-20">{children}</div>
          <CommonFooter />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </body>
    </html>
  )
}
