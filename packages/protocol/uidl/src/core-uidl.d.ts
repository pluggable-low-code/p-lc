/**
 * 核心 UIDL
 */
export interface CoreUidl<
  Expression extends CoreUidlExpression = CoreUidlExpression,
  Element extends CoreUidlElement = CoreUidlElement<Expression>,
> {
  /**
   * 版本，是协议版本，不是内容版本，内容版本可以通过扩展字段实现，比如：fileVersion、contentVersion 等
   */
  version?: string
  /**
   * 视图
   */
  view: Element
}

/**
 * 核心 UIDL 元素，即组件实例
 */
export interface CoreUidlElement<
  Expression extends CoreUidlExpression = CoreUidlExpression,
> {
  /**
   * 类型，即组件类型
   */
  type: string
  /**
   * 属性
   */
  props?: Record<string, Expression>
  /**
   * 子元素
   */
  children?: this[]
}

/**
 * 核心 UIDL 表达式
 */
export type CoreUidlExpression =
  | UidlExpressionStatic
  | UidlUnnormalizedExpressionStatic

/**
 * 核心 UIDL 基础表达式
 */
export interface CoreUidlBaseExpression {
  /**
   * 类型
   */
  type: string
  /**
   * 扩展字段
   */
  [key: string]: unknown
}

/**
 * 静态表达式
 */
export interface UidlExpressionStatic<T = unknown>
  extends CoreUidlBaseExpression {
  /**
   * 类型
   */
  type: 'static'
  /**
   * 值
   */
  value: T
}

/**
 * 非标准静态表达式
 */
export type UidlUnnormalizedExpressionStatic =
  | null
  | boolean
  | string
  | number
  | unknown[]
