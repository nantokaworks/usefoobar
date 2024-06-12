import { useEffect, useRef } from 'react'

export function useInterval(
  callback: () => void,
  delay?: number | null | false,
  immediate?: boolean
) {
  const refCallback = useRef<Function>(() => {})

  useEffect(() => {
    refCallback.current = callback
  })

  // Execute callback if immediate is set.
  useEffect(() => {
    if (!immediate || delay === undefined || delay === null || delay === false) return
    refCallback.current()
  }, [immediate])

  useEffect(() => {
    if (delay === null || delay === false) return
    const id = setInterval(() => refCallback.current(), delay || 0)
    return () => clearInterval(id)
  }, [delay])
}

export default useInterval
