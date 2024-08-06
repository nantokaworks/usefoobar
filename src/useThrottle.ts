import { useEffect, useRef, useState } from 'react'

export function useThrottle<T>(value: T, limit: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value)
  const lastRan = useRef<Date | null>(null)

  useEffect(() => {
    const now = new Date()

    if (!lastRan.current || now.getTime() - lastRan.current.getTime() >= limit) {
      setThrottledValue(value)
      lastRan.current = now
    } else {
      const handler = setTimeout(() => {
        setThrottledValue(value)
        lastRan.current = new Date()
      }, limit - (now.getTime() - lastRan.current.getTime()))

      return () => clearTimeout(handler)
    }

    return undefined
  }, [value, limit])

  return throttledValue
}
