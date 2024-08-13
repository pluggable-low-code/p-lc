import type { JsonPath } from '@p-lc/shared'
import { create } from '@p-lc/shared'
import type { UidlNormalizedExpression } from '@p-lc/uidl'
import type {
  AnyRuntimePlugin,
  Context,
  RuntimeDefaultPlugin,
  RuntimeRawPlugin,
} from '../types'

/**
 * 运行时表达式求值器插件属性扩展
 */
export interface RuntimePluginExpressionEvaluatorPropertiesExt {
  runtime: {
    /**
     * 表达式求值器
     */
    expressionEvaluators: Record<string, AnyExpressionEvaluator>
    /**
     * 添加表达式求值器
     */
    addExpressionEvaluator<EE extends AnyExpressionEvaluator>(
      expressionEvaluator: EE,
    ): void
  }
}

/**
 * 表达式求值器
 */
export interface ExpressionEvaluator<
  Expression extends UidlNormalizedExpression = UidlNormalizedExpression,
  ReturnT = unknown,
  Plugin extends AnyRuntimePlugin = RuntimeDefaultPlugin,
> {
  /**
   * 类型
   */
  type: Expression['type']
  /**
   * 表达式求值函数
   */
  eval: ExpressionEvalFunction<Expression, ReturnT, Plugin>
}

/**
 * 任意表达式求值器
 */
export type AnyExpressionEvaluator = ExpressionEvaluator<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  AnyRuntimePlugin
>

/**
 * 表达式求值函数
 */
export type ExpressionEvalFunction<
  Expression extends UidlNormalizedExpression = UidlNormalizedExpression,
  ReturnT = unknown,
  Plugin extends AnyRuntimePlugin = RuntimeDefaultPlugin,
> = (
  expr: Expression,
  ctx: Context<Plugin>,
  options: ExpressionEvalOptions,
) => ReturnT

/**
 * 表达式求值选项
 */
export interface ExpressionEvalOptions {
  /**
   * 表达式相对于当前上下文的 JSON 路径，默认：`[]`
   */
  relativeJsonPath: JsonPath
  /**
   * 表达式相对于当前上下文的逻辑路径，默认：`[]`
   */
  relativeLogicPath: JsonPath
}

/**
 * 运行时表达式求值器插件
 */
export const runtimePluginExpressionEvaluator: RuntimeRawPlugin<RuntimePluginExpressionEvaluatorPropertiesExt> =
  {
    id: 'expression-evaluator',
    initRuntime(ctx) {
      ctx.expressionEvaluators = create(null)
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      ctx.addExpressionEvaluator = (expressionEvaluator) => {
        ctx.expressionEvaluators[expressionEvaluator.type] = expressionEvaluator
      }
    },
  }
