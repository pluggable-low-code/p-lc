import type { AnyObject } from '@mobo-ts/shared'
import { computed, makeObservable } from 'mobx'

/**
 * shorthand of Object.create
 */
export const create = Object.create

/**
 * shorthand of Object.is
 */
export const is = Object.is

/**
 * shorthand of Object.defineProperty
 */
export const defineProperty = Object.defineProperty

/**
 * shorthand of Object.getOwnPropertyNames
 */
export const getOwnPropertyNames = Object.getOwnPropertyNames

/**
 * shorthand of Object.getOwnPropertyDescriptor
 */
export const getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor

/**
 * 定义可配置、可枚举的属性
 */
export const defineConfigurableEnumerableProperty: typeof defineProperty = (
  ...args
) => {
  args[2] = {
    configurable: true,
    enumerable: true,
    ...args[2],
  }
  return defineProperty(...args)
}

/**
 * 通过获取器定义属性
 * @param o 对象
 * @param p 属性键值
 * @param get 获取函数
 * @param attributes defineProperty 的描述符
 */
export function definePropertyByGetter<T extends AnyObject, P extends keyof T>(
  o: T,
  p: P,
  get: () => T[P],
  attributes?: PropertyDescriptor,
): T {
  return defineConfigurableEnumerableProperty(o, p, {
    get,
    ...attributes,
  })
}

/**
 * 懒初始化属性处理器
 */
export interface LazyInitPropertyHandler<T> {
  /**
   * 已经初始化
   */
  isInited: boolean
  /**
   * 重置，变为未初始化，下次获取时重新初始化
   */
  reset(): void
  /**
   * 当前值，未初始化为 `undefined`
   */
  current?: T
}

/**
 * 定义懒初始化属性
 * @param o 对象
 * @param p 属性键值
 * @param initFn 初始化函数
 * @param attributes defineProperty 的描述符
 */
export function defineLazyInitProperty<T extends AnyObject, P extends keyof T>(
  o: T,
  p: P,
  initFn: () => T[P],
  attributes?: PropertyDescriptor,
): LazyInitPropertyHandler<T[P]> {
  let isInited = false
  let current: T[P] | undefined
  defineConfigurableEnumerableProperty(o, p, {
    get() {
      if (!isInited) {
        current = initFn()
        isInited = true
      }
      return current
    },
    ...attributes,
  })
  const h: LazyInitPropertyHandler<T[P]> = {
    get isInited() {
      return isInited
    },
    get current() {
      return current
    },
    reset() {
      isInited = false
      current = undefined
    },
  }
  return h
}

/**
 * 定义计算的属性，默认是不可枚举的，注意对象基于类创建时，makeObservable 之后 configurable 为 false，不可再变为可枚举属性
 * @param o 对象
 * @param p 属性键值
 * @param get 获取函数
 * @param attributes defineProperty 的描述符
 */
export function defineComputedProperty<T extends AnyObject, P extends keyof T>(
  o: T,
  p: P,
  get: () => T[P],
  attributes?: PropertyDescriptor,
): T {
  definePropertyByGetter(o, p, get, {
    enumerable: false,
    ...attributes,
  })
  makeObservable(o, {
    [p]: computed,
  } as AnyObject)
  if (attributes?.enumerable === true) {
    defineProperty(o, p, {
      ...getOwnPropertyDescriptor(o, p),
      enumerable: true,
    })
  }
  return o
}

/**
 * shorthand of JSON.stringify
 */
export const jsonStringify = JSON.stringify

/**
 * shorthand of JSON.parse
 */
export const jsonParse = JSON.parse

/**
 * shorthand of JSON.stringify(value, null, 2)
 */
export function jsonStringifyTwoSpaces(value: unknown): string {
  return jsonStringify(value, null, 2)
}

/**
 * shorthand of Math.min
 */
export const mathMin = Math.min

/**
 * shorthand of Math.max
 */
export const mathMax = Math.max

/**
 * shorthand of Math.abs
 */
export const mathAbs = Math.abs

/**
 * shorthand of Number.MAX_SAFE_INTEGER
 */
export const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER
