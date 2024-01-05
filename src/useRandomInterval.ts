import { useCallback, useEffect, useRef } from 'react'
import saikoro from 'saikoro'

interface Options {
  minDelay: number | undefined
  maxDelay: number | undefined
}

/**
 * ランダムな setInterval
 * setInterval with random interval
 *
 * @example
 * ```tsx
 * import { useRandomInterval } from 'use-random-interval'
 *
 * useRandomInterval(() => {
 *   console.log(new Date())
 * })
 * ```
 */
export function useRandomInterval(callback: () => void, { minDelay, maxDelay }: Options) {
  const timeoutId = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const isEnabled = minDelay !== undefined && maxDelay !== undefined

    if (isEnabled) {
      const handleTick = () => {
        const nextCall = saikoro({ min: minDelay, max: maxDelay })()
        timeoutId.current = setTimeout(() => {
          savedCallback.current()
          handleTick()
        }, nextCall)
      }
      handleTick()
    }

    return () => clearTimeout(timeoutId.current)
  }, [minDelay, maxDelay])

  const cancel = useCallback(function () {
    clearTimeout(timeoutId.current)
  }, [])

  return cancel
}
