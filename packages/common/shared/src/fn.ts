import type { AnyFunction, ReadonlyUnknownArray } from '@mobo-ts/shared'
import { cacheOneParamFn } from '@mobo-ts/shared'
import { isFunction, memoize } from 'lodash-uni'
import { tuple } from './tuple'
import type { EchoFn, Fn, Returnable } from './types'

/**
 * 通过对象缓存单参数函数，函数参数为对象，用于运行时，其他地方用 weakMemoize 就行
 * @param fn 函数
 */
export function cacheOneParamFnByObj<T extends WeakKey, R>(
  fn: (arg: T) => R,
): (arg: T) => R {
  return cacheOneParamFn(fn, new WeakMap() as Map<T, R>)
}

/**
 * 弱记忆
 * @param fn 函数
 * @param resolver （键值）解析器
 */
export function weakMemoize<T extends AnyFunction>(
  fn: T,
  resolver?: (...args: Parameters<T>) => object,
): T {
  memoize.Cache = WeakMap
  const ret = memoize(fn, resolver)
  memoize.Cache = Map
  return ret
}

/**
 * 通过函数 + 参数元组弱记忆函数调用
 * @param fn 函数
 */
export function weakMemoizeByFnArgsTuple<T extends AnyFunction>(fn: T): T {
  return weakMemoize(fn, (...args) => tuple(fn, ...args))
}

/**
 * 通过参数元组弱记忆函数调用
 * @param fn 函数
 */
export function weakMemoizeByArgsTuple<T extends AnyFunction>(fn: T): T {
  return weakMemoize(fn, tuple)
}

/**
 * 执行函数
 * @param this 上下文
 * @param fn 函数
 * @param args 参数
 */
export function exec<Args extends ReadonlyUnknownArray, Return>(
  this: unknown,
  fn: (...args: Args) => Return,
  ...args: Args
): Return {
  return fn.call(this, ...args)
}

/**
 * 执行函数，通过参数元组缓存
 */
export const execWithTupleMemo = weakMemoizeByFnArgsTuple(exec)

/**
 * 批量转换
 * @param fns 转换函数
 * @param initV 初始值
 * @param args 参数
 * @returns 转换后的值
 */
export function batchTransform<V, O extends ReadonlyUnknownArray>(
  fns: ((v: V, ...args: O) => V | void)[],
  initV: V,
  ...args: O
): V {
  for (const fn of fns) {
    initV = fn(initV, ...args) || initV
  }
  return initV
}

/**
 * 使用函数约简并缓存结果
 * @param fns 函数
 * @param initialValue 初始值
 */
export function reduceByFnsWithCache<T>(fns: EchoFn<T>[], initialValue: T): T {
  return fns.reduceRight((p, c) => execWithTupleMemo(c, p), initialValue)
}

/**
 * 获取返回值
 * @param v 可返回的值
 * @param args 参数
 */
export function getReturnValue<T, Args extends ReadonlyUnknownArray>(
  v: Returnable<T, Args>,
  ...args: Args
): T {
  if (isFunction(v)) return v(...args)
  return v
}

/**
 * 回音函数
 * @param v 值
 */
export function echo<T>(v: T): T {
  return v
}

/**
 * 取反函数
 * @param fn 函数
 */
export function notFn<Args extends ReadonlyUnknownArray, R>(
  fn: Fn<Args, R>,
): Fn<Args, boolean> {
  return (...args) => !fn(...args)
}
