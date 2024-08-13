import { definePropertyByGetter } from '@p-lc/shared'
import type {
  AnyRuntimePlugin,
  Controller,
  DepPluginUniteRuntimePlugin,
  RuntimeRawPlugin,
} from '../types'
import type { LoopOrigin } from './runtime-plugin-for'
import { type runtimePluginFor } from './runtime-plugin-for'
import { type runtimePluginIf } from './runtime-plugin-if'

/**
 * 运行时控制器子（上下文）循环源插件属性扩展
 */
export interface RuntimePluginControllerChildrenLoopOriginPropertiesExt {
  controller: {
    /**
     * 子上下文循环源
     */
    childrenLoopOrigin?: LoopOrigin
  }
}

/**
 * 计算控制器子（上下文）循环源
 * @param ctx 控制器
 */
export function calcControllerChildrenLoopOrigin<
  Plugin extends AnyRuntimePlugin,
>(ctx: Controller<Plugin>): LoopOrigin | undefined {
  const { if: ifRet, for: forRet } = ctx as unknown as Controller<
    DepPluginUniteRuntimePlugin<
      typeof runtimePluginControllerChildrenLoopOrigin
    >
  >
  if (!ifRet) {
    return { items: [] }
  }
  return forRet
}

/**
 * 运行时控制器子（上下文）循环源插件
 */
export const runtimePluginControllerChildrenLoopOrigin: RuntimeRawPlugin<
  RuntimePluginControllerChildrenLoopOriginPropertiesExt,
  typeof runtimePluginIf | typeof runtimePluginFor
> = {
  id: 'controller-children-lo',
  initController(ctx) {
    definePropertyByGetter(ctx, 'childrenLoopOrigin', () =>
      calcControllerChildrenLoopOrigin(ctx),
    )
  },
}
