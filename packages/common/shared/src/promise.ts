import isPromise from 'is-promise'
import type { Promisable } from 'type-fest'

/**
 * 对可能为 Promise 的值进行下一步计算
 * @param p 可能为 Promise 的值
 * @param fn 计算函数
 */
export function promisableThen<T, R>(
  p: Promisable<T>,
  fn: (ret: T) => R,
): Promisable<R> {
  return isPromise(p) ? p.then(fn) : fn(p)
}
