import type {
  Code,
  EditorUidl,
  EditorUidlElement,
  EditorUidlExpression,
} from '@p-lc/uidl'
import type { Text } from './i18n'
import type { Initializer } from './initializer'
import type { Slot } from './slot'
import type { Upgrader } from './upgrader'

/**
 * 组件声明
 */
export interface Cd<
  Expression extends EditorUidlExpression = EditorUidlExpression,
  Element extends EditorUidlElement<Expression> = EditorUidlElement<Expression>,
> extends EditorUidl<Expression, Element> {
  /**
   * 类型，包内唯一
   */
  type: string
  /**
   * 名称
   */
  name: Text
  /**
   * 组名称
   */
  groupName?: Text
  /**
   * 描述
   */
  description?: Text
  /**
   * 图标，相对路径或 URL
   */
  icon?: string
  /**
   * 隐藏，组件库面板里不可见
   */
  hidden?: boolean
  /**
   * 实现的能力
   */
  implements?: Implements
  /**
   * 插槽
   */
  slots?: Slot[]
  /**
   * 代码
   */
  code: Code
  /**
   * 初始化器
   */
  initializer?: Initializer<Expression, Element>
  /**
   * 升级器
   */
  upgrader?: Upgrader
}

/**
 * CD 扩展键值
 */
export type CdExtendsKeys =
  | 'type'
  | 'name'
  | 'groupName'
  | 'description'
  | 'icon'
  | 'hidden'
  | 'implements'
  | 'slots'
  | 'code'
  | 'initializer'
  | 'upgrader'

/**
 * 实现的能力
 */
export interface Implements {
  /**
   * 样式
   */
  style?: boolean
  /**
   * 条件渲染
   */
  if?: boolean
  /**
   * 列表渲染
   */
  for?: boolean
}
