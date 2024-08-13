import type { ReadonlyUnknownArray } from '@mobo-ts/shared'
import type { VoidFn } from './types'

/**
 * 睡
 * @param ms 毫秒
 */
export function sleep(ms?: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms))
}

/**
 * 睡一帧
 */
export function sleepFrame(): Promise<DOMHighResTimeStamp> {
  return new Promise((r) => requestAnimationFrame(r))
}

/**
 * 睡一个微任务
 */
export function sleepMicrotask(): Promise<void> {
  return Promise.resolve()
}

/**
 * 通过 requestAnimationFrame 节流
 * @param fn 函数
 */
export function throttleByRaf<Args extends ReadonlyUnknownArray, Return>(
  fn: (...args: Args) => Return,
): (...args: Args) => void {
  let task: VoidFn | null = null
  return (...args) => {
    const shouldStartRaf = !task
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    task = () => fn(...args)
    if (shouldStartRaf) {
      requestAnimationFrame(() => {
        if (task) {
          const t = task
          task = null
          t()
        }
      })
    }
  }
}
