import { useEffect, useRef } from 'react'

export function useEffectDebounce(effect: () => void, ms: number, deps: any[]) {
  const callback = useRef(effect)

  useEffect(() => {
    callback.current = effect
  }, [effect])

  useEffect(() => {
    const handler = setTimeout(() => {
      callback.current()
    }, ms)

    return () => {
      clearTimeout(handler)
    }
  }, [...deps, ms])
}
