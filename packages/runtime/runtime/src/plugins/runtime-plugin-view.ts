import { defineLazyInitProperty } from '@p-lc/shared'
import type {
  AnyRuntimePlugin,
  Controller,
  DepPluginUniteRuntimePlugin,
  Runtime,
  RuntimeDefaultPropertiesExtHkt,
  RuntimeDefaultPropertiesExtHktPlugin,
  RuntimeRawPlugin,
} from '../types'
import { type runtimePluginInitContext } from './runtime-plugin-init-context'
import { type runtimePluginParent } from './runtime-plugin-parent'
import { type runtimePluginUidl } from './runtime-plugin-uidl'

/**
 * 运行时视图插件属性扩展高等类型
 */
export interface RuntimePluginViewPropertiesExtHkt<
  Plugin extends AnyRuntimePlugin,
> {
  runtime: {
    /**
     * 视图
     */
    view: Controller<Plugin>
  }
}

/**
 * RuntimePluginViewPropertiesExtHkt 辅助类型
 */
export interface $RuntimePluginViewPropertiesExtHkt
  extends RuntimeDefaultPropertiesExtHkt {
  type: RuntimePluginViewPropertiesExtHkt<
    RuntimeDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 原始的初始化视图
 * @param ctx 上下文，运行时
 */
function rawInitView(
  ctx: Runtime<DepPluginUniteRuntimePlugin<typeof runtimePluginView>>,
): Controller<DepPluginUniteRuntimePlugin<typeof runtimePluginView>> {
  return ctx.initController({
    parent: ctx,
    uidlElement: ctx.uidl.view,
  })
}

/**
 * 初始化视图
 * @param ctx 上下文，运行时
 */
export const initView = rawInitView as unknown as <
  Plugin extends AnyRuntimePlugin,
>(
  ctx: Runtime<Plugin>,
) => Controller<Plugin>

/**
 * 运行时视图插件
 */
export const runtimePluginView: RuntimeRawPlugin<
  $RuntimePluginViewPropertiesExtHkt,
  | typeof runtimePluginInitContext
  | typeof runtimePluginParent
  | typeof runtimePluginUidl
> = {
  id: 'view',
  initRuntime(ctx) {
    const h = defineLazyInitProperty(ctx, 'view', () => initView(ctx))
    return () => h.current?.dispose()
  },
}
