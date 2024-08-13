import type { EditorUidlElement, EditorUidlExpression } from '@p-lc/uidl'

/**
 * 初始化器
 */
export type Initializer<
  Expression extends EditorUidlExpression = EditorUidlExpression,
  Element extends EditorUidlElement<Expression> = EditorUidlElement<Expression>,
> = StaticInitializer<Expression, Element>

/**
 * 初始化器基础部分
 */
export interface InitializerBase {
  /**
   * 类型
   */
  type?: string
}

/**
 * 静态初始化器
 */
export interface StaticInitializer<
  Expression extends EditorUidlExpression = EditorUidlExpression,
  Element extends EditorUidlElement<Expression> = EditorUidlElement<Expression>,
> {
  /**
   * 类型
   */
  type?: 'static'
  /**
   * 元素部分初始值，语言 -> 初始值
   */
  partialElement?: Record<string, Partial<Element>>
}
