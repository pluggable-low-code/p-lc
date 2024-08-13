import type { UidlExpressionObject } from '@p-lc/uidl'
import { EXPRESSION_TYPE_OBJECT } from '@p-lc/uidl-utils'
import { mapValues } from 'lodash-uni'
import type { ExpressionEvaluator } from './runtime-plugin-expression-evaluator'
import { type runtimePluginExpressionEvaluator } from './runtime-plugin-expression-evaluator'

/**
 * 对象表达式求值器
 */
export const objectExpressionEvaluator: ExpressionEvaluator<UidlExpressionObject> =
  {
    type: EXPRESSION_TYPE_OBJECT,
    eval(expr, ctx, { relativeJsonPath, relativeLogicPath }) {
      return mapValues(expr.value, (childExpr, key) =>
        ctx.evalExpression(childExpr, {
          relativeJsonPath: [...relativeJsonPath, 'value', key],
          relativeLogicPath: [...relativeLogicPath, key],
        }),
      )
    },
  }

/**
 * 运行时对象表达式插件
 */
export const runtimePluginExpressionObject: typeof runtimePluginExpressionEvaluator =
  {
    id: 'expression-object',
    initRuntime(ctx) {
      ctx.addExpressionEvaluator(objectExpressionEvaluator)
    },
  }
