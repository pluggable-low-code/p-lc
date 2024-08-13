import { isObjectButNotArray } from '@p-lc/shared'
import type {
  NormalizeExpression,
  UidlExpression,
  UnnormalizeExpression,
} from '@p-lc/uidl'
import { EXPRESSION_TYPE_STATIC } from '../constants'

/**
 * 是标准表达式
 * @param expr 表达式
 */
export function isNormalizedExpression<Expression>(
  expr: Expression,
): expr is NormalizeExpression<Expression> {
  return isObjectButNotArray(expr)
}

/**
 * 获取表达式类型
 * @param expr 表达式
 */
export function getExpressionType<Expression extends UidlExpression>(
  expr: Expression,
): NormalizeExpression<Expression>['type'] {
  if (isNormalizedExpression(expr)) {
    return expr.type
  }
  return EXPRESSION_TYPE_STATIC
}

/**
 * 标准化表达式
 * @param expr 非标准表达式
 */
export function normalizeExpression<Expression extends UidlExpression>(
  expr: Expression,
): NormalizeExpression<Expression> {
  if (isNormalizedExpression(expr)) {
    return expr
  }
  return {
    type: EXPRESSION_TYPE_STATIC,
    value: expr,
  } as NormalizeExpression<Expression>
}

/**
 * 非标准表达式
 * @param expr 标准表达式
 */
export function unnormalizeExpression<Expression extends UidlExpression>(
  expr: Expression,
): UnnormalizeExpression<Expression> {
  if (!isNormalizedExpression(expr)) {
    return expr
  }
  if (
    expr.type === EXPRESSION_TYPE_STATIC &&
    !isObjectButNotArray(expr.value)
  ) {
    return expr.value as UnnormalizeExpression<Expression>
  }
  return expr
}
