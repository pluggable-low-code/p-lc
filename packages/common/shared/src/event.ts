import type { VoidFn } from './types'

const doc = document

/**
 * shorthand of window.addEventListener
 */
export const winAddEventListener = addEventListener

/**
 * shorthand of window.removeEventListener
 */
export const winRemoveEventListener = removeEventListener

/**
 * shorthand of document.addEventListener
 */
export const docAddEventListener = doc.addEventListener

/**
 * shorthand of document.removeEventListener
 */
export const docRemoveEventListener = doc.removeEventListener

/**
 * 停止冒泡并阻止默认行为
 * @param ev 事件
 */
export function stopPropagationAndPreventDefault(ev: {
  stopPropagation: VoidFn
  preventDefault: VoidFn
}): void {
  ev.stopPropagation()
  ev.preventDefault()
}
