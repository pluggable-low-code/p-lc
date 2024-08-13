// 从 https://github.com/benjamn/immutable-tuple 抄的，那边没有 TS，也很久没维护了

import type { ReadonlyUnknownArray } from '@mobo-ts/shared'
import { WeakableMap } from './map'

/**
 * 元组 Map 节点
 */
type TupleMapNode = WeakableMap<unknown, TupleMapNode> & {
  t?: unknown
}

/**
 * 元组 Map 根节点
 */
const tupleMapRootNode: TupleMapNode = new WeakableMap()

/**
 * 元组，全局唯一
 * @param args 元组内容
 */
export function tuple<T extends ReadonlyUnknownArray>(...args: T): T {
  let node = tupleMapRootNode
  for (const arg of args) {
    node = node.get(arg) || node.set(arg, new WeakableMap())
  }
  return (node.t as T) || (node.t = args)
}
