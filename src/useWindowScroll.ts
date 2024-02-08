import { useCallback, useLayoutEffect, useState } from 'react'

export function useWindowScroll() {
  const [scroll, setScroll] = useState<{ x: number | undefined; y: number | undefined }>({
    x: undefined,
    y: undefined,
  })

  const scrollTo = useCallback(({ x, y }: { x: number; y: number }) => {
    window.scrollTo(x, y)
  }, [])

  useLayoutEffect(() => {
    const handleScroll = () => {
      setScroll({ x: window.scrollX, y: window.scrollY })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return [scroll, scrollTo]
}
