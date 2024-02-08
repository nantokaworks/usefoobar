import { useLayoutEffect, useState } from 'react'

export function useWindowResize() {
  const [size, setSize] = useState<{ w: number | undefined; h: number | undefined }>({
    w: undefined,
    h: undefined,
  })

  useLayoutEffect(() => {
    const handleResize = () => {
      setSize({
        w: window.innerWidth,
        h: window.innerHeight,
      })
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return size
}
