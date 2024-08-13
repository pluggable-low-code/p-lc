import type { SoftAs } from '@p-lc/shared'
import type { EditorUidlExpression, UidlExpressionBox } from '@p-lc/uidl'
import {
  EXPRESSION_TYPE_BOX,
  isBoxExpression,
  unnormalizeExpression,
} from '@p-lc/uidl-utils'
import { isUndefined, pick } from 'lodash-uni'

/**
 * 盒子类型：切换
 */
export const BOX_TYPE_SWITCH = 'switch'

/**
 * 切换盒子表达式
 */
export interface UidlExpressionSwitchBox<
  Expression extends EditorUidlExpression = EditorUidlExpression,
> extends UidlExpressionBox<Expression> {
  /**
   * 盒子类型
   */
  boxType: typeof BOX_TYPE_SWITCH
  /**
   * switch case
   */
  case: string
  /**
   * 旧的表达式，case -> 表达式
   */
  oldExprs: Record<string, Expression>
}

/**
 * 是绑定盒子表达式
 * @param expr 表达式
 */
export function isSwitchBoxExpression<
  Expression extends EditorUidlExpression = EditorUidlExpression,
>(
  expr?: Expression,
): expr is SoftAs<UidlExpressionSwitchBox<Expression>, Expression> {
  return isBoxExpression(expr) && expr.boxType === BOX_TYPE_SWITCH
}

export function changeSwitchBoxExpression<
  Expression extends EditorUidlExpression = EditorUidlExpression,
>(
  expr: UidlExpressionSwitchBox<Expression> | undefined,
  newCase: string,
  innerExpr: Expression | undefined,
  allCases: string[],
): UidlExpressionSwitchBox<Expression> {
  const newExpr = { ...switchBox(expr, newCase, allCases) }
  if (isUndefined(innerExpr)) delete newExpr.expr
  else newExpr.expr = unnormalizeExpression(innerExpr) as Expression
  return newExpr
}

/**
 * 切换盒子，切换切换盒子表达式
 * @param expr 切换盒子表达式
 * @param newCase 新的 switch case
 * @returns 新的表达式对象
 */
export function switchBox<
  Expression extends EditorUidlExpression = EditorUidlExpression,
>(
  expr: UidlExpressionSwitchBox<Expression> | undefined,
  newCase: string,
  allCases: string[],
): UidlExpressionSwitchBox<Expression> {
  if (!expr) {
    return {
      type: EXPRESSION_TYPE_BOX,
      boxType: BOX_TYPE_SWITCH,
      case: newCase,
      oldExprs: {},
    }
  }
  const { case: switchCase, expr: innerExpr, oldExprs } = expr
  if (newCase === switchCase) return expr
  const newOldExprs = { ...oldExprs }
  const newExpr = { ...expr, case: newCase }
  if (!isUndefined(innerExpr)) {
    newOldExprs[switchCase] = innerExpr
  }
  const oldInnerExpr = newOldExprs[newCase]
  if (isUndefined(oldInnerExpr)) {
    delete newExpr.expr
  } else {
    newExpr.expr = oldInnerExpr
  }
  delete newOldExprs[newCase]
  newExpr.oldExprs = pick(newOldExprs, allCases)
  return newExpr
}
