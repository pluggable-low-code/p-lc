import isPromiseLike from 'is-promise'
import type { Promisable } from 'type-fest'

export { isPromiseLike }

/**
 * 值是 Promise
 * @param v 值
 */
export function isPromise<T, S>(v: PromiseLike<T> | S): v is Promise<T> {
  return v instanceof Promise
}

/**
 * 对可能为 Promise 的值进行下一步计算
 * @param p 可能为 Promise 的值
 * @param thenFn 下一步函数
 * @
 */
export function promisableThen<T, R1, R2 = void>(
  p: Promisable<T>,
  thenFn: (ret: T) => R1,
  catchFn?: (err: unknown) => R2,
): Promisable<R1 | R2> {
  if (isPromiseLike(p)) {
    return (async (): Promise<R1 | R2> => {
      let ret
      try {
        ret = await p
      } catch (err) {
        return catchFn?.(err) as Promise<R2>
      }
      return thenFn(ret)
    })()
  }
  return thenFn(p)
}
