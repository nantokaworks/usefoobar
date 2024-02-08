import { useCallback, useLayoutEffect, useState } from 'react'

export function useWindowScroll() {
  const [scrolling, setScrolling] = useState(false)
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
      setScrolling(true)
    }
    const handleScrollEnd = () => {
      setScrolling(false)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('scrollend', handleScrollEnd)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scrollend', handleScrollEnd)
    }
  }, [])

  return { scrolling, scroll, scrollTo }
}
