import type { AnyArray } from '@mobo-ts/shared'

/**
 * value + onChange 属性
 */
export interface ValueOnChangeProps<T = unknown, Args extends AnyArray = []> {
  /**
   * 值
   */
  value?: T
  /**
   * 值变化事件
   * @param newValue 新的值
   */
  onChange?: (newValue: T, ...args: Args) => void
}
