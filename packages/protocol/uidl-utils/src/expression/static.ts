import { isObjectButNotArray } from '@p-lc/shared'
import type {
  UidlExpression,
  UidlExpressionArray,
  UidlExpressionObject,
  UidlExpressionStatic,
  UidlUnnormalizedExpressionStatic,
} from '@p-lc/uidl'
import { isArray, mapValues } from 'lodash-uni'
import {
  EXPRESSION_TYPE_ARRAY,
  EXPRESSION_TYPE_OBJECT,
  EXPRESSION_TYPE_STATIC,
} from '../constants'
import { isArrayExpression, isObjectExpression, isStaticExpression } from './is'
import { normalizeExpression, unnormalizeExpression } from './normalize'

/**
 * 获取静态表达式值，如果不是静态表达式，则返回 `undefined`
 * @param expr 表达式
 */
export function getStaticExpressionValue<Expression extends UidlExpression>(
  expr?: Expression,
): unknown {
  if (isStaticExpression(expr)) {
    return normalizeExpression(expr).value
  }
}

/**
 * 创建静态表达式
 * @param value 值
 */
export function createStaticExpression<T>(value: T): UidlExpressionStatic<T> {
  return {
    type: EXPRESSION_TYPE_STATIC,
    value,
  }
}

/**
 * JSON 值转静态表达式
 * @param json JSON 值
 */
export function jsonToStaticExpression<T>(
  json: T,
): UidlExpressionStatic<T> | UidlUnnormalizedExpressionStatic {
  return unnormalizeExpression({
    type: EXPRESSION_TYPE_STATIC,
    value: json,
  })
}

/**
 * 转数组表达式，自动判断数组表达式、静态表达式
 * @param expr 表达式
 */
export function toArrayExpression<Expression extends UidlExpression>(
  expr?: Expression,
): UidlExpressionArray<Expression> | undefined {
  if (isArrayExpression(expr)) {
    return expr as UidlExpressionArray<Expression>
  }
  const value = getStaticExpressionValue(expr)
  if (isArray(value)) {
    return {
      type: EXPRESSION_TYPE_ARRAY,
      value: value.map(jsonToStaticExpression) as Expression[],
    }
  }
}

/**
 * 转对象表达式，自动判断对象表达式、静态表达式
 * @param expr 表达式
 */
export function toObjectExpression<Expression extends UidlExpression>(
  expr?: Expression,
): UidlExpressionObject<Expression> | undefined {
  if (isObjectExpression(expr)) {
    return expr as UidlExpressionObject<Expression>
  }
  const value = getStaticExpressionValue(expr)
  if (isObjectButNotArray(value)) {
    return {
      type: EXPRESSION_TYPE_OBJECT,
      value: mapValues(value, jsonToStaticExpression) as Record<
        string,
        Expression
      >,
    }
  }
}
