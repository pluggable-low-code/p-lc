import { notFn } from '@p-lc/shared'
import { isEqual } from 'lodash-uni'
import type { useMemo } from 'react'
import { useRcUtilMemo } from '../rc-util'

/**
 * 使用深度比较的缓存
 * @param factory 产生值的工厂
 * @param deps 依赖
 */
export const useDeepCompareMemo: typeof useMemo = (factory, deps) => {
  return useRcUtilMemo(factory, deps, notFn(isEqual))
}
