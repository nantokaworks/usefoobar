import { MouseOrTouchEvent } from './types'

export function isTouchEvent(event: MouseOrTouchEvent) {
  return window.TouchEvent
    ? event.nativeEvent instanceof TouchEvent
    : 'touches' in event.nativeEvent
}

export function isMouseEvent(event: MouseOrTouchEvent) {
  return event.nativeEvent instanceof MouseEvent
}
