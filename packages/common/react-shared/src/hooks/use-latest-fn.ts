import type { AnyFunction } from '@p-lc/shared'
import { useCallback, useRef } from 'react'

/**
 * 使用最新的函数，返回不变的函数包装
 * @param fn 函数
 */
export function useLatestFn<T extends AnyFunction>(fn: T): T {
  const fnRef = useRef<T>()
  fnRef.current = fn
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoFn = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ((...args: Parameters<T>) => fnRef.current!(...args)) as ReturnType<T>,
    [],
  )
  return memoFn
}
