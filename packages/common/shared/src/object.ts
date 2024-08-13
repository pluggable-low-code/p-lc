import type { AnyObject } from '@mobo-ts/shared'
import {
  get,
  isArray,
  isEqualWith,
  isObject,
  isUndefined,
  keys,
  last,
  values,
} from 'lodash-uni'
import { is } from './es'
import type { JsonKey, JsonPath } from './types'

/**
 * 已定义的值
 * @param o 对象、
 */
export function definedValues<T>(
  o?: Record<PropertyKey, T> | null,
): Exclude<T, undefined>[] {
  return values(o).filter((v) => !isUndefined(v)) as Exclude<T, undefined>[]
}

/**
 * 取消设置干净版，数组使用 splice
 * @param obj 对象
 * @param path 路径
 */
export function unsetClean<T>(obj: unknown, path: JsonPath): T {
  const p = get(obj, path.slice(0, -1))
  const key = last(path) as JsonKey
  const ret = p[key]
  if (isArray(p)) p.splice(key as number, 1)
  else delete p[key]
  return ret
}

/**
 * 删除对象所有键值
 * @param o 对象
 */
export function deleteAllKeys(o: AnyObject): void {
  for (const key in o) {
    delete o[key]
  }
}

/**
 * 是对象，但不是数组
 * @param v 值
 */
export function isObjectButNotArray<T>(
  v: T,
): v is object & Exclude<T, readonly unknown[]> {
  return isObject(v) && !isArray(v)
}

/**
 * 浅比较两个对象（或数组）是否相等
 * @param a 对象 a
 * @param b 对象 b
 */
export function isShallowEqual(a: unknown, b: unknown): boolean {
  return isEqualWith(a, b, (aval, bval, indexOrKey) => {
    if (!isUndefined(indexOrKey)) return is(aval, bval)
  })
}

/**
 * 是一部分对象
 * @param o 对象
 * @param p 可能的部分对象
 */
export function isPartialObject<T extends AnyObject>(
  o: T,
  p: unknown,
): p is Partial<T> {
  if (!isObjectButNotArray(p)) return false
  for (const key in p) {
    if (p[key as keyof typeof p] !== o[key]) return false
  }
  return true
}

/**
 * 对象里的首个键值
 * @param o 对象
 */
export function firstKeyOfObject<K extends PropertyKey, V>(
  o?: Record<K, V>,
): K | undefined {
  for (const key in o) {
    return key
  }
}

/**
 * 对象里的首个值
 * @param o 对象
 */
export function firstValueOfObject<K extends PropertyKey, V>(
  o?: Record<K, V>,
): V | undefined {
  for (const key in o) {
    return o[key]
  }
}

/**
 * 删除所有 undefined 的值
 * @param o 对象
 */
export function deleteUndefinedValues<T extends object>(o: T): T {
  for (const key in o) {
    if (isUndefined(o[key])) delete o[key]
  }
  return o
}

/**
 * 键值计数
 * @param o 对象
 */
export function countKeys(o?: object): number {
  return keys(o).length
}

/**
 * 清洗对象，删除所有 undefined 的值，并把空对象转为 undefined
 * @param o 对象
 */
export function clearObjectToUndefined<T extends object>(o: T): T | undefined {
  deleteUndefinedValues(o)
  return countKeys(o) ? o : undefined
}

/**
 * 获取对象值或者对象里的首个值
 * @param o 对象
 * @param key 键值
 */
export function getObjectValueOrFirstValue<K extends PropertyKey, V>(
  o?: Record<K, V>,
  key?: K,
): V | undefined {
  if (!isUndefined(key)) {
    const value = o?.[key]
    if (!isUndefined(value)) return value
  }
  return firstValueOfObject(o)
}
