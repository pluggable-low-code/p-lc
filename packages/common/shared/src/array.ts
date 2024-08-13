import { intersection, isArray, isNil, pullAll } from 'lodash-uni'
import { weakMemoize } from './fn'
import type { Arrayable, Nil } from './types'

/**
 * 数组转 Map
 * @param arr 数组
 * @param resolver （键值）解析器
 */
export function arrayToMap<T, K>(
  arr: T[],
  resolver: (item: T) => K,
): Map<K, T> {
  return new Map(arr.map((item) => [resolver(item), item]))
}

/**
 * 创建弱记忆的数组转 Map
 * @param resolver （键值）解析器
 */
export function createWeakMemoizeArrayToMap<T, K>(
  resolver: (item: T) => K,
): (arr: T[]) => Map<K, T> {
  const fn = weakMemoize(arrayToMap)
  return (arr: T[]): Map<K, T> => fn(arr, resolver)
}

/**
 * 数组以该子数组开始
 * @param arr 数组
 * @param subArr 子数组
 * @param isEqual 相等判断
 * @param exact 精确，默认 false
 */
export function arrayStartsWith<T1, T2>(
  arr: T1[],
  subArr: T2[],
  isEqual?: (a: T1, b: T2) => boolean,
  exact?: boolean,
): boolean {
  if (exact && arr.length !== subArr.length) {
    return false
  }
  for (let i = 0; i < subArr.length; i++) {
    const a = arr[i]
    const b = subArr[i]
    if ((a as unknown) !== (b as unknown) && !isEqual?.(a, b)) {
      return false
    }
  }
  return true
}

/**
 * 过滤出非空值
 * @param arr 数组
 */
export function filterNotNil<T>(arr: T[]): Exclude<T, Nil>[] {
  return arr.filter((v) => !isNil(v)) as Exclude<T, Nil>[]
}

/**
 * 两个数组交叉
 * @param arr1 数组一
 * @param arr2 数组二
 * @returns 数组一独有、两者共有、数组二独有
 */
export function intersectionTwo<T>(arr1: T[], arr2: T[]): [T[], T[], T[]] {
  const inter = intersection(arr1, arr2)
  const arr1Only = pullAll([...arr1], inter)
  const arr2Only = pullAll([...arr2], inter)
  return [arr1Only, inter, arr2Only]
}

/**
 * 可数组化转数组
 * @param v 可数组化的值
 */
export function arrayableToArray<T>(v: Arrayable<T> = []): T[] {
  return isArray(v) ? v : [v]
}

/**
 * 数组转可数组化
 * @param v 数组
 */
export function arrayToArrayable<T>(v: T[]): Arrayable<T> {
  return v.length === 1 ? v[0] : v
}
