import type { Uidl } from '@p-lc/uidl'
import type {
  ENTITY_DETAIL_TYPE_ELEMENT,
  ENTITY_DETAIL_TYPE_EXPRESSION,
} from './constants'

/**
 * Uidl 的元素
 */
export type ElementOfUidl<T> =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  T extends Uidl<infer _Expression, infer Element> ? Element : never

/**
 * Uidl 的表达式
 */
export type ExpressionOfUidl<T> =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  T extends Uidl<infer Expression, infer _Element> ? Expression : never

/**
 * 实体详情类型：元素
 */
export type EntityDetailTypeElement = typeof ENTITY_DETAIL_TYPE_ELEMENT

/**
 * 实体详情类型：表达式
 */
export type EntityDetailTypeExpression = typeof ENTITY_DETAIL_TYPE_EXPRESSION

/**
 * 实体详情类型
 */
export type EntityDetailType =
  | EntityDetailTypeElement
  | EntityDetailTypeExpression
