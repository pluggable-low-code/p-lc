import type { ReactNode } from 'react'

/**
 * React 插槽渲染函数
 * @param options 选项
 */
export type ReactSlotRenderFn<T = unknown> = (
  options?: ReactSlotRenderFnOptions<T>,
) => ReactNode

/**
 * React 插槽渲染函数选项
 */
export type ReactSlotRenderFnOptions<T = unknown> =
  | (Partial<Pick<ReactSlotRenderFnAllOptions<T>, 'index'>> &
      Omit<ReactSlotRenderFnAllOptions<T>, 'index'>)
  | (Partial<Pick<ReactSlotRenderFnAllOptions<T>, 'key'>> &
      Omit<ReactSlotRenderFnAllOptions<T>, 'key'>)

/**
 * React 插槽渲染函数所有选项
 */
export interface ReactSlotRenderFnAllOptions<T = unknown> {
  /**
   * 渲染项
   */
  item: T
  /**
   * 渲染下标
   */
  index: number
  /**
   * 渲染键值
   */
  key: string
  /**
   * 所有项
   */
  items?: T[]
}
