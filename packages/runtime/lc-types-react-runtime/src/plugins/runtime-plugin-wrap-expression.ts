import type { LcTypesUidlExpression } from '@p-lc/lc-types-uidl'
import type { InitLoop, RuntimePlugin } from '@p-lc/runtime'
import type { JsonPath } from '@p-lc/shared'
import { get, isEqual } from 'lodash-uni'
import type { runtimePluginLogicPath } from './runtime-plugin-logic-path'

/**
 * 运行时包装表达式插件属性扩展
 */
export interface RuntimePluginWrapExpressionPropertiesExt {
  context: {
    /**
     * 包装表达式
     * @param expr 表达式
     * @param logicPath 修改时的逻辑路径
     */
    wrapExpression?(
      expr: LcTypesUidlExpression | undefined,
      logicPath: JsonPath,
    ): LcTypesUidlExpression | undefined
    /**
     * 去包装表达式
     * @param expr 表达式
     * @param logicPath 修改时的逻辑路径
     */
    unwrapExpression?(
      expr: LcTypesUidlExpression | undefined,
      logicPath: JsonPath,
    ): LcTypesUidlExpression | undefined
  }
  contextInitOptions: {
    /**
     * 循环（数据）
     */
    loop?: InitLoop<{
      /**
       * 包装表达式
       * @param expr 表达式
       */
      wrapExpression?(
        expr?: LcTypesUidlExpression,
      ): LcTypesUidlExpression | undefined
      /**
       * 去包装表达式
       * @param expr 表达式
       */
      unwrapExpression?(
        expr?: LcTypesUidlExpression,
      ): LcTypesUidlExpression | undefined
    }>
  }
}

/**
 * 运行时包装表达式插件
 */
export const runtimePluginWrapExpression: RuntimePlugin<
  RuntimePluginWrapExpressionPropertiesExt,
  typeof runtimePluginLogicPath
> = {
  id: 'wrap-expression',
  initContext(ctx) {
    const {
      parent,
      initOptions: { loop: initLoop },
      logicPath: currentLogicPath,
    } = ctx
    for (const fnKey of ['wrapExpression', 'unwrapExpression'] as const) {
      const parentFn = parent[fnKey]
      const initFn = get(initLoop, ['item', fnKey])
      ctx[fnKey] =
        (initFn &&
          // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
          ((expr, logicPath) => {
            if (isEqual(logicPath, currentLogicPath)) {
              return initFn(expr)
            }
            return expr
          })) ||
        parentFn
    }
  },
}
