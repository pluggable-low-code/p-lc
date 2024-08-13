import type { Patch } from 'immer'
import { jsonStringify } from './es'

/**
 * 合并补丁
 * @param aps 补丁 a
 * @param bps 补丁 b
 */
export function mergePatchs(aps: Patch[], bps: Patch[]): Patch[] {
  // 去掉重复的 replace
  const replacePathSet = new Set<string>()
  for (const p of bps) {
    if (p.op === 'replace') {
      replacePathSet.add(jsonStringify(p.path))
    }
  }
  aps = aps.filter(
    (p) => p.op !== 'replace' || !replacePathSet.has(jsonStringify(p.path)),
  )
  return [...aps, ...bps]
}
