import type { AnyArray, ReadonlyUnknownArray, SoftAs } from '@mobo-ts/shared'

/**
 * 函数
 */
export type Fn<Args extends ReadonlyUnknownArray, R> = (...args: Args) => R

/**
 * 回调函数
 */
export type CbFn<Args extends ReadonlyUnknownArray, R = void> = Fn<Args, R>

/**
 * 返回某种值的函数
 */
export type ReturnValueFn<R, Args extends ReadonlyUnknownArray = []> = Fn<
  Args,
  R
>

/**
 * 空函数
 */
export type VoidFn = ReturnValueFn<void>

/**
 * 可返回的值
 */
export type Returnable<T, Args extends ReadonlyUnknownArray = []> =
  | T
  | ReturnValueFn<T, Args>

/**
 * 返回值
 */
export type ReturnValue<T> = T extends Returnable<infer P, AnyArray> ? P : never

/**
 * 回音函数
 */
export type EchoFn<T> = Fn<[T], T>

/**
 * 可选回音函数
 */
export type OptionalEchoFn<T> = (v: T) => T | void

/**
 * 带值回调函数
 */
export type CallbackWithValueFn<T> = (v: T) => void

/**
 * 预测函数
 */
export type Predicate<
  T,
  FirstArg = unknown,
  MoreArgs extends ReadonlyUnknownArray = [],
> = (
  firstArg: FirstArg,
  ...moreArgs: MoreArgs
) => firstArg is SoftAs<T, FirstArg>
