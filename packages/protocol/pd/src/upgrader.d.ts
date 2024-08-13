import type { EditorUidlElement, EditorUidlExpression } from '@p-lc/uidl'

/**
 * 升级器
 */
export type Upgrader = InlineJsUpgrader

/**
 * 升级器基础部分
 */
export interface UpgraderBase {
  /**
   * 类型
   */
  type?: string
  /**
   * 语义化版本
   */
  version: string
}

/**
 * 内联 JS 升级器
 */
export interface InlineJsUpgrader extends UpgraderBase {
  /**
   * 类型
   */
  type?: 'inline-js'
  /**
   * JS 代码
   */
  code: string
}

/**
 * 内联 JS 升级器代码（表达式）需要返回的函数
 */
export interface InlineJsUpgraderCodeFn<
  Expression extends EditorUidlExpression = EditorUidlExpression,
  Element extends EditorUidlElement<Expression> = EditorUidlElement<Expression>,
> {
  /**
   * 组件声明内联 JS 升级器代码（表达式）需要返回的函数
   * @param element 元素（组件实例）
   */
  (element: Element): void | Element
}
