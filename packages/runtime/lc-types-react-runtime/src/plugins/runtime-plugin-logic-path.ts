import type { InitLoop, RuntimePlugin } from '@p-lc/runtime'
import { CONTEXT_TYPE_ELEMENT } from '@p-lc/runtime'
import type { JsonPath } from '@p-lc/shared'
import { get, isArray } from 'lodash-uni'
import { type runtimePluginLcTypesUidl } from './runtime-plugin-lc-types-uidl'

/**
 * 运行时逻辑路径插件属性扩展
 */
export interface RuntimePluginLogicPathPropertiesExt {
  context: {
    /**
     * 逻辑路径
     */
    logicPath?: JsonPath
  }
  contextInitOptions: {
    /**
     * 循环（数据）
     */
    loop?: InitLoop<{
      /**
       * 逻辑路径
       */
      logicPath?: JsonPath
    }>
  }
}

/**
 * 运行时逻辑路径插件
 */
export const runtimePluginLogicPath: RuntimePlugin<
  RuntimePluginLogicPathPropertiesExt,
  typeof runtimePluginLcTypesUidl
> = {
  id: 'logic-path',
  initContext(ctx) {
    const {
      parent: { logicPath: parentLogicPath },
      initOptions: { loop: initLoop },
    } = ctx
    const loopLogicPath = get(initLoop, 'item.logicPath')
    let uidlLogicPath: JsonPath | undefined
    if (ctx.type === CONTEXT_TYPE_ELEMENT) {
      uidlLogicPath = ctx.uidlElement.logicPath
    }
    if (parentLogicPath || uidlLogicPath) {
      ctx.logicPath = [
        ...(parentLogicPath || []),
        ...(isArray(loopLogicPath) ? loopLogicPath : []),
        ...(uidlLogicPath || []),
      ]
    }
  },
}
