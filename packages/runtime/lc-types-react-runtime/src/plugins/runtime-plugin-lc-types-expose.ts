import type { LcTypesUidlExpression } from '@p-lc/lc-types-uidl'
import type { RuntimePlugin } from '@p-lc/runtime'
import type { JsonPath } from '@p-lc/shared'
import {
  isBoxExpression,
  logicGetExpressionInElement,
  normalizeExpression,
} from '@p-lc/uidl-utils'
import { isUndefined } from 'lodash-uni'
import { type runtimePluginLcTypesUidl } from './runtime-plugin-lc-types-uidl'
import type { runtimePluginLcTypesUidlUtilsConfig } from './runtime-plugin-lc-types-uidl-utils-config'

/**
 * 运行时低代码类型暴露插件属性扩展
 */
export interface RuntimePluginLcTypesExposePropertiesExt {
  runtime: {
    /**
     * 获取表达式
     * @param logicPath 逻辑路径
     */
    getExpression(logicPath: JsonPath): LcTypesUidlExpression | undefined
    /**
     * 获取拆盒后的标准表达式
     * @param logicPath 逻辑路径
     */
    getUnboxNormExpr(logicPath: JsonPath): LcTypesUidlExpression | undefined
  }
}

/**
 * 运行时低代码类型暴露插件，像表达式提供属性、函数
 */
export const runtimePluginLcTypesExpose: RuntimePlugin<
  RuntimePluginLcTypesExposePropertiesExt,
  typeof runtimePluginLcTypesUidl | typeof runtimePluginLcTypesUidlUtilsConfig
> = {
  id: 'lc-types-expose',
  initRuntime(ctx) {
    ctx.getExpression = getExpression
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    ctx.getUnboxNormExpr = (logicPath) => {
      let expr = getExpression(logicPath)
      while (isBoxExpression(expr)) {
        expr = expr.expr
      }
      if (!isUndefined(expr)) {
        return normalizeExpression(expr)
      }
    }

    function getExpression(
      logicPath: JsonPath,
    ): LcTypesUidlExpression | undefined {
      const {
        uidlUtilsConfig,
        data: { uidlElement },
      } = ctx
      if (uidlElement) {
        return logicGetExpressionInElement(
          uidlUtilsConfig,
          uidlElement,
          logicPath,
        )
      }
    }
  },
}
