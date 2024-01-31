import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import React, { useCallback, useEffect, useState } from 'react'

const fetchData = () =>
  fetch('/api/zyc-blog', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt') || ''}`,
    },
  }).then((res) => res.json())

export const ReactQuery = () => {
  const [flag, setFlag] = useState(0)
  const [num, setNum] = useState(0)

  console.log(flag, num)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNum((_) => _ + 1)
    }, 3000)
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  const { data, isLoading, error, refetch } = useQuery(['fetchData', flag], fetchData, {
    // refetchInterval: 1000 * 30 * 1,
    // refetchIntervalInBackground: true,
    // keepPreviousData: true,
    enabled: !!localStorage.getItem('jwt'),
    staleTime: 5 * 1000,
    // cacheTime: 60 * 1000, // gc time
  })
  useEffect(() => {
    console.log('[req-log]: mounted', dayjs().format('YYYY-MM-DD HH:mm:ss'))
    return () => {
      console.log('[req-log]: unmounted', dayjs().format('YYYY-MM-DD HH:mm:ss'))
    }
  }, [])

  useEffect(() => {
    if (data) console.log('[req-log]: fetched: ', dayjs().format('YYYY-MM-DD HH:mm:ss'))
  }, [data])

  const onRefetch = useCallback(() => {
    refetch({ cancelRefetch: false }).catch(console.log)
  }, [refetch])

  const onRefresh = useCallback(() => {
    setFlag((_) => _ + 1)
  }, [])

  const increaseNum = useCallback(() => {
    setNum((_) => _ + 1)
  }, [])

  if (isLoading) return <div>{isLoading}</div>
  if (error) return <div>{JSON.stringify(error)}</div>

  return (
    <div>
      <span className="text-red-300">{num}</span>
      <button onClick={onRefetch}>Refetch</button>
      <button onClick={onRefresh}>Refresh flag</button>
      <button onClick={increaseNum}>setNum</button>
      <div className="text-green-300">{JSON.stringify(data)}</div>
    </div>
  )
}
