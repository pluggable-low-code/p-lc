import type {
  AnyRuntimePlugin,
  Context,
  Runtime,
  RuntimeDefaultPropertiesExtHkt,
  RuntimeDefaultPropertiesExtHktPlugin,
  RuntimeRawPlugin,
} from '../types'

/**
 * 运运行时父（上下文）插件属性扩展高等类型
 */
export interface RuntimePluginParentPropertiesExtHkt<
  Plugin extends AnyRuntimePlugin,
> {
  context: {
    /**
     * 根上下文，即运行时
     */
    root: Runtime<Plugin>
    /**
     * 父上下文，运行时的父上下文是自己
     */
    parent: Context<Plugin>
  }
  contextInitOptions: {
    /**
     * 父上下文
     */
    parent?: Context<Plugin>
  }
}

/**
 * RuntimePluginParentPropertiesExtHkt 辅助类型
 */
export interface $RuntimePluginParentPropertiesExtHkt
  extends RuntimeDefaultPropertiesExtHkt {
  type: RuntimePluginParentPropertiesExtHkt<
    RuntimeDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 运行时父（上下文）插件
 */
export const runtimePluginParent: RuntimeRawPlugin<$RuntimePluginParentPropertiesExtHkt> =
  {
    id: 'parent',
    initContext(ctx) {
      const parent = (ctx.parent = ctx.initOptions.parent || ctx)
      ctx.root = parent === ctx ? (ctx as typeof ctx.root) : parent.root
    },
  }
