import { range } from 'lodash-uni'
import type { ForwardedRef, RefCallback } from 'react'
import { useEffect, useMemo, useRef } from 'react'
import { useLatest } from 'react-use'
import { fillRef } from '../rc-util'

/**
 * 使用可切换的引用，使用多个内部引用来赋值外部引用
 * @param outRef 外部需要改的引用
 * @param status 当前状态，表示需要使用哪个内部引用
 * @param count 内部引用数量，需要传入常量
 * @returns 内部引用
 */
export function useSwitchableRefs<T, P extends T = T>(
  outRef: ForwardedRef<T>,
  status: number | boolean,
  count = 2,
): RefCallback<P>[] {
  const refCache = useRef<T>()
  const index = +status
  const refLatestIndex = useLatest(index)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const refLatestRefs = useLatest(range(count).map(() => useRef<P>()))
  const handleRefs = useMemo(
    () =>
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      range(count).map((i) => (el: P) => {
        refLatestRefs.current[i].current = el
        if (refCache.current === el || refLatestIndex.current !== i) {
          return
        }
        refCache.current = el
        fillRef(outRef, el)
      }),
    [count, outRef, refLatestIndex, refLatestRefs],
  )
  useEffect(() => {
    const el = refLatestRefs.current[index].current
    if (el) handleRefs[index](el)
  }, [handleRefs, index, refLatestRefs])
  return handleRefs
}
