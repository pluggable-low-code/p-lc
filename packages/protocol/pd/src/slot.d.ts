import type { Text } from './i18n'

/**
 * 插槽
 */
export type Slot = StaticPathSlot | DynamicPathSlot

/**
 * 插槽基础部分
 */
export interface SlotBase {
  /**
   * 类型
   */
  type?: string
  /**
   * 名称
   */
  name?: Text
  /**
   * 动态渲染
   */
  dynamicRender?: boolean
}

/**
 * 静态路径插槽
 */
export interface StaticPathSlot extends SlotBase {
  /**
   * 静态路径
   */
  type?: 'static-path'
  /**
   * 逻辑路径
   */
  logicPath: (string | number)[]
}

/**
 * 动态路径插槽
 */
export interface DynamicPathSlot extends SlotBase {
  /**
   * 动态路径
   */
  type: 'dynamic-path'
  /**
   * 动态逻辑路径，可以用 `'*'` 表示任意字段
   */
  dynamicLogicPath: (string | number)[]
}
