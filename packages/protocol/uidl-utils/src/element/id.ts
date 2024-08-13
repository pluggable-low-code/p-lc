import { createRandomVarId } from '@p-lc/shared'

/**
 * 创建元素 ID
 */
export function createElementId(): string {
  return `r${createRandomVarId()}`
}
