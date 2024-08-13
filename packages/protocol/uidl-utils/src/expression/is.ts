import type { SoftAs } from '@p-lc/shared'
import type {
  NormalizeExpression,
  UidlExpression,
  UidlExpressionArray,
  UidlExpressionBox,
  UidlExpressionObject,
  UidlExpressionSlot,
  UidlExpressionStatic,
  UidlUnnormalizedExpressionStatic,
} from '@p-lc/uidl'
import { isUndefined } from 'lodash-uni'
import {
  EXPRESSION_TYPE_ARRAY,
  EXPRESSION_TYPE_BOX,
  EXPRESSION_TYPE_OBJECT,
  EXPRESSION_TYPE_SLOT,
  EXPRESSION_TYPE_STATIC,
} from '../constants'
import { getExpressionType } from './normalize'

/**
 * 是静态表达式
 * @param expr 表达式
 */
export function isStaticExpression<Expression extends UidlExpression>(
  expr?: Expression,
): expr is SoftAs<
  Expression extends NormalizeExpression<Expression>
    ? UidlExpressionStatic
    : UidlExpressionStatic | UidlUnnormalizedExpressionStatic,
  Expression
> {
  return (
    !isUndefined(expr) && getExpressionType(expr) === EXPRESSION_TYPE_STATIC
  )
}

/**
 * 是对象表达式
 * @param expr 表达式
 */
export function isObjectExpression<Expression extends UidlExpression>(
  expr?: Expression,
): expr is SoftAs<
  Expression extends UidlExpressionObject<infer P>
    ? UidlExpressionObject<P>
    : UidlExpressionObject<Expression>,
  Expression
> {
  return !!expr && getExpressionType(expr) === EXPRESSION_TYPE_OBJECT
}

/**
 * 是数组表达式
 * @param expr 表达式
 */
export function isArrayExpression<Expression extends UidlExpression>(
  expr?: Expression,
): expr is SoftAs<
  Expression extends UidlExpressionArray<infer P>
    ? UidlExpressionArray<P>
    : UidlExpressionArray<Expression>,
  Expression
> {
  return !!expr && getExpressionType(expr) === EXPRESSION_TYPE_ARRAY
}

/**
 * 是插槽表达式
 * @param expr 表达式
 */
export function isSlotExpression<Expression extends UidlExpression>(
  expr?: Expression,
): expr is SoftAs<
  Expression extends UidlExpressionSlot<infer P1, infer P2>
    ? UidlExpressionSlot<P1, P2>
    : UidlExpressionSlot<Expression>,
  Expression
> {
  return !!expr && getExpressionType(expr) === EXPRESSION_TYPE_SLOT
}

/**
 * 是盒子表达式
 * @param expr 表达式
 */
export function isBoxExpression<Expression extends UidlExpression>(
  expr?: Expression,
): expr is SoftAs<
  Expression extends UidlExpressionBox<infer P>
    ? UidlExpressionBox<P>
    : UidlExpressionBox<Expression>,
  Expression
> {
  return !!expr && getExpressionType(expr) === EXPRESSION_TYPE_BOX
}
