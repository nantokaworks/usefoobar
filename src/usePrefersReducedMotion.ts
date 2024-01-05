import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: no-preference)'

const isRenderingOnServer = typeof window === 'undefined'

const genInitialState = () => {
  return isRenderingOnServer ? true : !window.matchMedia(QUERY).matches
}

/**
 * React で OS のアニメーション有効/無効を取得できる
 * React can get OS animation enable/disable.
 *
 * @example
 * ```tsx
 * import { usePrefersReducedMotion } from 'usehonya'
 * const prefersReducedMotion = usePrefersReducedMotion()
 * return (
 *   <div style={{ color: prefersReducedMotion ? 'white' : 'red'}}>
 *     ~~~
 *   </div>
 * )
 * ```
 */
export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(genInitialState)
  useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY)

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(!event.matches)
    }
    mediaQueryList.addEventListener('change', listener)
    return () => {
      mediaQueryList.removeEventListener('change', listener)
    }
  }, [])

  return prefersReducedMotion
}
