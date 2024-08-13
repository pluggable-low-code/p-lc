import { defineLazyInitProperty, STR_CHILDREN } from '@p-lc/shared'
import type {
  AnyRuntimePlugin,
  Controller,
  DepPluginUniteRuntimePlugin,
  Element,
  RuntimeDefaultPropertiesExtHkt,
  RuntimeDefaultPropertiesExtHktPlugin,
  RuntimeRawPlugin,
} from '../types'
import { type runtimePluginInitContext } from './runtime-plugin-init-context'
import { type runtimePluginParent } from './runtime-plugin-parent'
import { type runtimePluginUidl } from './runtime-plugin-uidl'

/**
 * 运行时元素子（上下文）插件属性扩展高等类型
 */
export interface RuntimePluginElementChildrenPropertiesExtHkt<
  Plugin extends AnyRuntimePlugin,
> {
  element: {
    /**
     * 子上下文，控制器
     */
    children: Controller<Plugin>[]
  }
}

/**
 * RuntimePluginElementChildrenPropertiesExtHkt 辅助类型
 */
export interface $RuntimePluginElementChildrenPropertiesExtHkt
  extends RuntimeDefaultPropertiesExtHkt {
  type: RuntimePluginElementChildrenPropertiesExtHkt<
    RuntimeDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 原始的初始化元素子（上下文）
 * @param ctx 上下文，元素
 */
function rawInitElementChildren(
  ctx: Element<
    DepPluginUniteRuntimePlugin<typeof runtimePluginElementChildren>
  >,
): Controller<
  DepPluginUniteRuntimePlugin<typeof runtimePluginElementChildren>
>[] {
  return (ctx.uidlElement.children || []).map((uidlElement) => {
    return ctx.root.initController({
      parent: ctx,
      uidlElement,
    })
  })
}

/**
 * 初始化元素子（上下文）
 * @param ctx 上下文，元素
 */
export const initElementChildren = rawInitElementChildren as unknown as <
  Plugin extends AnyRuntimePlugin,
>(
  ctx: Element<Plugin>,
) => Controller<Plugin>[]

/**
 * 运行时元素子（上下文）插件
 */
export const runtimePluginElementChildren: RuntimeRawPlugin<
  $RuntimePluginElementChildrenPropertiesExtHkt,
  | typeof runtimePluginInitContext
  | typeof runtimePluginParent
  | typeof runtimePluginUidl
> = {
  id: 'element-children',
  initElement(ctx) {
    const h = defineLazyInitProperty(ctx, STR_CHILDREN, () =>
      initElementChildren(ctx),
    )
    return () => h.current?.map((c) => c.dispose())
  },
}
