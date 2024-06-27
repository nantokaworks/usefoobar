import { useMemo, useRef } from 'react'
import { MouseOrTouchEvent } from './types'
import { isMouseEvent, isTouchEvent } from './utils'

export type UseLongPressOptions = {
  threshold?: number
  onStart?: (e: MouseOrTouchEvent) => void
  onFinish?: (e: MouseOrTouchEvent) => void
  onCancel?: (e: MouseOrTouchEvent) => void
  onClick?: (e: MouseOrTouchEvent) => void
}

export function useLongPress(
  callback?: (e: MouseOrTouchEvent) => void,
  options: UseLongPressOptions = {}
) {
  const { threshold = 400, onStart, onFinish, onCancel } = options
  const isLongPressActive = useRef(false)
  const isPressed = useRef(false)
  const timerId = useRef<NodeJS.Timeout>()

  return useMemo(() => {
    const start = (event: MouseOrTouchEvent) => {
      if (!isMouseEvent(event) && !isTouchEvent(event)) return
      if (onStart) {
        onStart(event)
      }

      isPressed.current = true
      timerId.current = setTimeout(() => {
        if (callback) callback(event)
        isLongPressActive.current = true
      }, threshold)
    }

    const cancel = (event: MouseOrTouchEvent) => {
      if (!isMouseEvent(event) && !isTouchEvent(event)) return
      if (isLongPressActive.current) {
        if (onFinish) {
          onFinish(event)
        }
      } else if (isPressed.current) {
        if (onCancel) {
          onCancel(event)
        }
      }

      isLongPressActive.current = false
      isPressed.current = false

      if (timerId.current) {
        window.clearTimeout(timerId.current)
      }
    }

    return {
      onMouseDown: start,
      onMouseUp: cancel,
      onMouseLeave: cancel,
      onTouchStart: start,
      onTouchEnd: cancel,
    }
  }, [callback, threshold, onCancel, onFinish, onStart])
}
