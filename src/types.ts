export type MouseOrTouchEvent<T = HTMLElement> =
  | React.MouseEvent<T, MouseEvent>
  | React.TouchEvent<T>
