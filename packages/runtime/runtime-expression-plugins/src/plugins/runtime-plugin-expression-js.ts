import type { ExpressionEvaluator, RuntimePlugin } from '@p-lc/runtime'
import { cacheOneParamFn } from '@p-lc/shared'
import { EXPRESSION_TYPE_JS, type UidlExpressionJs } from '@p-lc/uidl-ext-js'

/**
 * 代码转函数
 */
const codeToFn = cacheOneParamFn((code: string) => {
  return new Function('ctx', `return (${code})`)
})

/**
 * JS 表达式求值器，会在全局缓存函数
 */
export const jsExpressionEvaluator: ExpressionEvaluator<UidlExpressionJs> = {
  type: EXPRESSION_TYPE_JS,
  eval({ code }, ctx) {
    return codeToFn(code)(ctx)
  },
}

/**
 * 运行时 JS 表达式插件
 */
export const runtimePluginExpressionJs: RuntimePlugin = {
  id: 'expression-js',
  initRuntime(ctx) {
    ctx.addExpressionEvaluator(jsExpressionEvaluator)
  },
}
