import type { UidlExpression } from '@p-lc/uidl'
import { normalizeExpression } from '@p-lc/uidl-utils'
import type {
  Context,
  DepPluginUniteRuntimePlugin,
  RuntimeRawPlugin,
} from '../types'
import type {
  AnyExpressionEvaluator,
  ExpressionEvalOptions,
} from './runtime-plugin-expression-evaluator'
import { type runtimePluginExpressionEvaluator } from './runtime-plugin-expression-evaluator'
import { type runtimePluginParent } from './runtime-plugin-parent'

/**
 * 运行时求值表达式插件属性扩展
 */
export interface RuntimePluginEvalExpressionPropertiesExt {
  context: {
    /**
     * 求值表达式
     * @param expr 表达式
     * @param options 选项
     */
    evalExpression<Expression extends UidlExpression>(
      expr: Expression,
      options?: EvalExpressionOptions,
    ): unknown
  }
}

/**
 * 求值表达式选项
 */
export interface EvalExpressionOptions extends Partial<ExpressionEvalOptions> {
  /**
   * 静默，只打印报错，不抛出，默认: `false`
   */
  silent?: boolean
}

/**
 * 求值表达式
 * @param this 上下文
 * @param expr 表达式
 * @param options 选项
 */
function evalExpression<Expression extends UidlExpression>(
  this: Context<
    DepPluginUniteRuntimePlugin<typeof runtimePluginEvalExpression>
  >,
  expr: Expression,
  {
    relativeJsonPath = [],
    relativeLogicPath = [],
    silent,
  }: EvalExpressionOptions = {},
): unknown {
  const finalOptions: ExpressionEvalOptions = {
    relativeJsonPath,
    relativeLogicPath,
  }
  const normalizedExpr = normalizeExpression(expr)
  try {
    const ee = this.root.expressionEvaluators[normalizedExpr.type] as
      | AnyExpressionEvaluator
      | undefined
    if (!ee) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`invalid expression type: ${normalizedExpr.type}`, {
          expr,
          ctx: this,
        })
      }
      throw new Error(`invalid expression type: ${normalizedExpr.type}`)
    }
    return ee.eval(normalizedExpr, this, finalOptions)
  } catch (err) {
    if (silent) {
      if (process.env.NODE_ENV === 'test') {
        console.log(`eval expression failed silent: ${(err as Error).message}`)
      } else {
        console.error('eval expression failed silent: ', {
          err,
          expr,
          ctx: this,
        })
      }
    } else {
      throw err
    }
  }
}

/**
 * 运行时求值表达式插件
 */
export const runtimePluginEvalExpression: RuntimeRawPlugin<
  RuntimePluginEvalExpressionPropertiesExt,
  typeof runtimePluginExpressionEvaluator | typeof runtimePluginParent
> = {
  id: 'eval-expression',
  initContext(ctx) {
    ctx.evalExpression = evalExpression
  },
}
