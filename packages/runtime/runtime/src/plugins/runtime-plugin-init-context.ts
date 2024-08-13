import {
  CONTEXT_TYPE_CONTROLLER,
  CONTEXT_TYPE_ELEMENT,
  controllerExtKeys,
  elementExtKeys,
} from '../constants'
import type {
  AnyRuntimePlugin,
  Controller,
  ControllerInitOptions,
  Element,
  ElementInitOptions,
  RuntimeDefaultPropertiesExtHkt,
  RuntimeDefaultPropertiesExtHktPlugin,
  RuntimeRawPlugin,
} from '../types'
import { type runtimePluginInitOptionsTransfrom } from './runtime-plugin-init-options-transform'
import { type runtimePluginParent } from './runtime-plugin-parent'

/**
 * 运行时初始化上下文插件属性扩展高等类型
 */
export interface RuntimePluginInitContextPropertiesExtHkt<
  Plugin extends AnyRuntimePlugin,
> {
  context: {
    /**
     * 初始化控制器
     */
    initController(
      initOptions: ControllerInitOptions<Plugin>,
    ): Controller<Plugin>
    /**
     * 初始化元素
     */
    initElement(initOptions: ElementInitOptions<Plugin>): Element<Plugin>
  }
}

/**
 * RuntimePluginInitContextPropertiesExtHkt 辅助类型
 */
export interface $RuntimePluginInitContextPropertiesExtHkt
  extends RuntimeDefaultPropertiesExtHkt {
  type: RuntimePluginInitContextPropertiesExtHkt<
    RuntimeDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 运行时初始化上下文插件
 */
export const runtimePluginInitContext: RuntimeRawPlugin<
  $RuntimePluginInitContextPropertiesExtHkt,
  typeof runtimePluginInitOptionsTransfrom | typeof runtimePluginParent
> = {
  id: 'init-context',
  initContext(ctx) {
    ctx.initController = ((initOptions) => {
      return ctx.initSubcontext(
        controllerExtKeys,
        ctx.root.transformInitOptions(
          CONTEXT_TYPE_CONTROLLER,
          initOptions,
          ctx,
        ),
      )
    }) as typeof ctx.initController
    ctx.initElement = ((initOptions) => {
      return ctx.initSubcontext(
        elementExtKeys,
        ctx.root.transformInitOptions(CONTEXT_TYPE_ELEMENT, initOptions, ctx),
      )
    }) as typeof ctx.initElement
  },
}
