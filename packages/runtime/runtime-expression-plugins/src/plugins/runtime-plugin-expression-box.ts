import type { ExpressionEvaluator, RuntimePlugin } from '@p-lc/runtime'
import type { UidlExpressionBox } from '@p-lc/uidl'
import { EXPRESSION_TYPE_BOX } from '@p-lc/uidl-utils'
import { isUndefined } from 'lodash-uni'

/**
 * 盒子表达式求值器
 */
export const boxExpressionEvaluator: ExpressionEvaluator<UidlExpressionBox> = {
  type: EXPRESSION_TYPE_BOX,
  eval(expr, ctx, { relativeJsonPath, relativeLogicPath }) {
    const innerExpr = expr.expr
    if (isUndefined(innerExpr)) return innerExpr
    return ctx.evalExpression(innerExpr, {
      relativeJsonPath: [...relativeJsonPath, 'expr'],
      relativeLogicPath,
    })
  },
}

/**
 * 运行时盒子表达式插件
 */
export const runtimePluginExpressionBox: RuntimePlugin = {
  id: 'expression-box',
  initRuntime(ctx) {
    ctx.addExpressionEvaluator(boxExpressionEvaluator)
  },
}
