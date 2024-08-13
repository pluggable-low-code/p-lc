import type {
  CoreUidl,
  CoreUidlBaseExpression,
  CoreUidlElement,
  CoreUidlExpression,
  UidlUnnormalizedExpressionStatic,
} from './core-uidl'
import type { UidlDependency } from './dependencies'

/**
 * 用户界面定义语言
 */
export interface Uidl<
  Expression extends UidlExpression = UidlExpression,
  Element extends UidlElement = UidlElement<Expression>,
> extends CoreUidl<Expression, Element> {
  /**
   * 依赖
   */
  dependencies?: UidlDependency[]
  /**
   * 组件
   */
  components?: UidlComponent[]
  /**
   * 扩展字段
   */
  [key: string]: unknown
}

/**
 * UIDL 元素，即组件实例
 */
export interface UidlElement<Expression extends UidlExpression = UidlExpression>
  extends CoreUidlElement<Expression> {
  /**
   * 唯一标识
   */
  id: string
  /**
   * 条件渲染
   */
  if?: Expression
  /**
   * 列表渲染
   */
  for?: Expression
  /**
   * 扩展字段
   */
  [key: string]: unknown
}

/**
 * UIDL 组件，当 pkgName 为 DefaultPkgName 时，可以省略 UidlComponent，默认 elementType === componentType
 */
export interface UidlComponent {
  /**
   * 元素类型
   */
  elementType: string
  /**
   * 包名，和 Pd 里的 pkgName 字段保持一致
   */
  pkgName: string
  /**
   * 包版本
   */
  pkgVersion: string
  /**
   * 组件类型，和 Cd 里的 type 字段保持一致
   */
  componentType: string
  /**
   * 导入路径，指最终 `ctx.dependencies[pkgName]` 里的路径，默认为: `[componentType]`
   */
  importPath?: (string | number)[]
}

/**
 * 默认包名
 */
export type DefaultPkgName = ''

/**
 * UIDL 表达式
 */
export type UidlExpression =
  | CoreUidlExpression
  | UidlUnknownExpression
  | UidlExpressionObject<UidlExpression>
  | UidlExpressionArray<UidlExpression>
  | UidlExpressionSlot<UidlExpression, UidlElement>

/**
 * UIDL 基础表达式
 */
export type UidlBaseExpression = CoreUidlBaseExpression

/**
 * 未知表达式
 */
export interface UidlUnknownExpression extends UidlBaseExpression {
  /**
   * 类型，防止跟字面字符串类型合并
   */
  type: string & {}
}

/**
 * 对象表达式
 */
export interface UidlExpressionObject<
  Expression extends UidlExpression = UidlExpression,
> extends UidlBaseExpression {
  /**
   * 类型
   */
  type: 'object'
  /**
   * 对象形式，值为表达式
   */
  value: Record<string, Expression>
}

/**
 * 数组表达式
 */
export interface UidlExpressionArray<
  Expression extends UidlExpression = UidlExpression,
> extends UidlBaseExpression {
  /**
   * 类型
   */
  type: 'array'
  /**
   * 数组形式，值为表达式
   */
  value: Expression[]
}

/**
 * 插槽表达式
 */
export interface UidlExpressionSlot<
  Expression extends UidlExpression = UidlExpression,
  Element extends UidlElement = UidlElement<Expression>,
> extends UidlBaseExpression {
  /**
   * 类型
   */
  type: 'slot'
  /**
   * 元素
   */
  value: Element[]
  /**
   * 动态渲染
   */
  dynamic?: boolean
}

/**
 * 标准化表达式
 */
export type NormalizeExpression<Expression> = Exclude<
  Expression,
  UidlUnnormalizedExpressionStatic
>

/**
 * 非标准化表达式
 */
export type UnnormalizeExpression<Expression> =
  | Expression
  | UidlUnnormalizedExpressionStatic

/**
 * UIDL 标准化的表达式
 */
export type UidlNormalizedExpression = NormalizeExpression<UidlExpression>
