import type { UidlBaseExpression, UidlExpression } from '@p-lc/uidl'
import { getExpressionType } from '@p-lc/uidl-utils'

/**
 * JS 表达式类型
 */
export const EXPRESSION_TYPE_JS = 'js'

/**
 * JS 表达式
 */
export interface UidlExpressionJs extends UidlBaseExpression {
  /**
   * 类型
   */
  type: typeof EXPRESSION_TYPE_JS
  /**
   * 代码
   */
  code: string
}

/**
 * 是 JS 表达式
 * @param expr 表达式
 */
export function isJsExpression(
  expr?: UidlExpression,
): expr is UidlExpressionJs {
  return !!expr && getExpressionType(expr) === EXPRESSION_TYPE_JS
}
