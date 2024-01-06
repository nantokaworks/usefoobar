import { useEffect, useState } from 'react'

/**
 * Client(Browser)サイドのレンダリング判定用
 * For Client (Browser) side rendering judgment
 *
 * @example
 * ```tsx
 * import { useIsClient } from 'usefoobar'
 * const isClient = useIsClient()
 * ```
 */
export function useIsClient() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => setIsClient(true), [])

  return isClient
}

/**
 * useIsClientの高速判定Ver
 * useIsClient Fast Judgment Ver.
 *
 * @example
 * ```tsx
 * import { useIsClientLazy } from 'usefoobar'
 * const isClient = useIsClientLazy()
 * ```
 */
export function useIsClientLazy() {
  const isServer = !(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.documentElement
  )

  return !isServer
}
