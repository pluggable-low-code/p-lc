import type { UidlExpressionArray } from '@p-lc/uidl'
import { EXPRESSION_TYPE_ARRAY } from '@p-lc/uidl-utils'
import type { ExpressionEvaluator } from './runtime-plugin-expression-evaluator'
import { type runtimePluginExpressionEvaluator } from './runtime-plugin-expression-evaluator'

/**
 * 数组表达式求值器
 */
export const arrayExpressionEvaluator: ExpressionEvaluator<UidlExpressionArray> =
  {
    type: EXPRESSION_TYPE_ARRAY,
    eval(expr, ctx, { relativeJsonPath, relativeLogicPath }) {
      return expr.value.map((childExpr, index) =>
        ctx.evalExpression(childExpr, {
          relativeJsonPath: [...relativeJsonPath, 'value', index],
          relativeLogicPath: [...relativeLogicPath, index],
        }),
      )
    },
  }

/**
 * 运行时数组表达式插件
 */
export const runtimePluginExpressionArray: typeof runtimePluginExpressionEvaluator =
  {
    id: 'expression-array',
    initRuntime(ctx) {
      ctx.addExpressionEvaluator(arrayExpressionEvaluator)
    },
  }
