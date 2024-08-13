import { useLatestFn } from '@p-lc/react-shared'
import type { ContinuousScroller, Point } from '@p-lc/shared'
import {
  createPoint,
  createRectangleByHtmlElement,
  createRectangleByZoom,
  getClosestHtmlElementBy,
  isChildHtmlElement,
  isInRectangle,
  isScrollableHtmlElement,
  mathAbs,
  startContinuousScroll,
  zeroPoint,
} from '@p-lc/shared'
import type { RefObject } from 'react'
import { useRef } from 'react'
import type { DefaultEditor } from '../../../types'
import { useEditor } from '../../editor-plugin-editor-react-context'
import type { UseDragMoveCbOptions } from './use-drag-move'
import { useDragMove } from './use-drag-move'

/**
 * 使用拖拽自动滚动获取可滚动元素
 */
export interface UseDragAutoScrollGetScrollable<
  T extends HTMLElement,
  E = DefaultEditor,
> {
  /**
   * 使用拖拽移动回调
   * @param options 选项
   */
  (options: UseDragMoveCbOptions<E>): T | null | undefined
}

/**
 * 使用拖拽自动滚动
 */
export function useDragAutoScroll<T extends HTMLElement, E = DefaultEditor>(
  getScrollable: UseDragAutoScrollGetScrollable<T, E>,
): void {
  const {
    dndStore: { autoScrollDistance, autoScrollSpeed },
  } = useEditor()
  const getVector = useLatestFn((el: T, point: Point) => {
    const bounding = createRectangleByHtmlElement(el)
    if (
      !isInRectangle(point, createRectangleByZoom(bounding, autoScrollDistance))
    ) {
      return zeroPoint
    }
    let dx = 0
    let dy = 0
    if (mathAbs(point.x - bounding.s.x) < autoScrollDistance) {
      dx = -autoScrollSpeed
    } else if (mathAbs(bounding.e.x - point.x) < autoScrollDistance) {
      dx = autoScrollSpeed
    }
    if (mathAbs(point.y - bounding.s.y) < autoScrollDistance) {
      dy = -autoScrollSpeed
    } else if (mathAbs(bounding.e.y - point.y) < autoScrollDistance) {
      dy = autoScrollSpeed
    }
    return createPoint(dx, dy)
  })
  const refContinuousScroller = useRef<ContinuousScroller<T>>()
  useDragMove(
    (options) => {
      const { point } = options
      const el = getScrollable(options as UseDragMoveCbOptions<E>)
      let scroller = refContinuousScroller.current
      if (!el) {
        scroller?.dispose()
        refContinuousScroller.current = undefined
        return
      }
      const v = getVector(el, point)
      if (scroller?.obj !== el) {
        scroller?.dispose()
        scroller = refContinuousScroller.current = startContinuousScroll(el, v)
      } else {
        scroller.vector = v
      }
    },
    () => {
      const scroller = refContinuousScroller.current
      if (!scroller) return
      scroller.dispose()
      delete refContinuousScroller.current
    },
  )
}

/**
 * 使用拖拽自动滚动引用
 * @param shouldFindScrollableChild 需要查找可滚动的子元素
 * @param checkDisable 检查是否禁止
 */
export function useDragAutoScrollRef<T extends HTMLElement>(
  shouldFindScrollableChild?: boolean,
  checkDisable?: () => boolean,
): RefObject<T> {
  void shouldFindScrollableChild
  const refEl = useRef<T>(null)
  useDragAutoScroll(({ target }) => {
    if (checkDisable?.()) return null
    let el = refEl.current
    if (el && shouldFindScrollableChild) {
      const elScrollable = getClosestHtmlElementBy(
        target,
        isScrollableHtmlElement,
      )
      if (isChildHtmlElement(el, elScrollable)) {
        el = elScrollable as T
      }
    }
    return el
  })
  return refEl
}
