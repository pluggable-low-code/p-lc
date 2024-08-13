import type { UidlExpressionStatic } from '@p-lc/uidl'
import { EXPRESSION_TYPE_STATIC } from '@p-lc/uidl-utils'
import type { ExpressionEvaluator } from './runtime-plugin-expression-evaluator'
import { type runtimePluginExpressionEvaluator } from './runtime-plugin-expression-evaluator'

/**
 * 静态表达式求值器
 */
export const staticExpressionEvaluator: ExpressionEvaluator<UidlExpressionStatic> =
  {
    type: EXPRESSION_TYPE_STATIC,
    eval(expr) {
      return expr.value
    },
  }

/**
 * 运行时静态表达式插件
 */
export const runtimePluginExpressionStatic: typeof runtimePluginExpressionEvaluator =
  {
    id: 'expression-staic',
    initRuntime(ctx) {
      ctx.addExpressionEvaluator(staticExpressionEvaluator)
    },
  }
