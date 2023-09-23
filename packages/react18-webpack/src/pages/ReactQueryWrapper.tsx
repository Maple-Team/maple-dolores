import React, { useCallback, useState } from 'react'
import { ReactQuery } from './ReactQuery'

export const ReactQueryWrapper = () => {
  const [status, setStatus] = useState<boolean>(true)
  const toggleStatus = useCallback(() => {
    setStatus((_) => !_)
  }, [])
  return (
    <>
      <p>
        <button onClick={toggleStatus}>{status ? 'unMount' : 'mount'}</button>
      </p>
      {status && <ReactQuery />}
    </>
  )
}
