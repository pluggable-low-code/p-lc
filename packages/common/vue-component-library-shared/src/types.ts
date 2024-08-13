import type { Slot } from 'vue'

/**
 * Vue 插槽渲染函数
 * @param options 选项
 */
export type VueSlotRenderFn<T = unknown> = (
  options?: VueSlotRenderFnOptions<T>,
) => ReturnType<Slot>

/**
 * Vue 插槽渲染函数选项
 */
export type VueSlotRenderFnOptions<T = unknown> =
  | (Partial<Pick<VueSlotRenderFnAllOptions<T>, 'index'>> &
      Omit<VueSlotRenderFnAllOptions<T>, 'index'>)
  | (Partial<Pick<VueSlotRenderFnAllOptions<T>, 'key'>> &
      Omit<VueSlotRenderFnAllOptions<T>, 'key'>)

/**
 * Vue 插槽渲染函数所有选项
 */
export interface VueSlotRenderFnAllOptions<T = unknown> {
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
