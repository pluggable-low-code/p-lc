import type { SoftAs } from '@p-lc/shared'
import type { Uidl } from '@p-lc/uidl'
import type { ElementOfUidl } from '@p-lc/uidl-utils'
import type { Get } from 'type-fest'
import { CONTEXT_TYPE_RUNTIME } from '../constants'
import type {
  AnyRuntimePlugin,
  Runtime,
  RuntimeDefaultPropertiesExtHkt,
  RuntimeDefaultPropertiesExtHktPlugin,
  RuntimeRawPlugin,
} from '../types'
import { type runtimePluginContextType } from './runtime-plugin-context-type'

/**
 * 运行时 UIDL 插件属性扩展高等类型
 */
export interface RuntimePluginUidlPropertiesExtHkt<
  Plugin extends AnyRuntimePlugin,
> {
  runtime: {
    /**
     * UIDL
     */
    uidl: Uidl
  }
  runtimeInitOptions: {
    /**
     * UIDL
     */
    uidl: Uidl
  }
  controller: {
    /**
     * （当前上下文对应的）UIDL 元素
     */
    uidlElement: ElementOfUidl<RuntimeFinalUidl<Plugin>>
  }
  controllerInitOptions: {
    /**
     * （当前上下文对应的）UIDL 元素
     */
    uidlElement: ElementOfUidl<RuntimeFinalUidl<Plugin>>
  }
  element: {
    /**
     * （当前上下文对应的）UIDL 元素
     */
    uidlElement: ElementOfUidl<RuntimeFinalUidl<Plugin>>
  }
  elementInitOptions: {
    /**
     * （当前上下文对应的）UIDL 元素
     */
    uidlElement: ElementOfUidl<RuntimeFinalUidl<Plugin>>
  }
}

/**
 * 运行时最终 UIDL
 */
export type RuntimeFinalUidl<Plugin extends AnyRuntimePlugin> = SoftAs<
  Get<Runtime<Plugin>, ['uidl']>,
  Uidl
>

/**
 * RuntimePluginUidlPropertiesExtHkt 辅助类型
 */
export interface $RuntimePluginUidlPropertiesExtHkt
  extends RuntimeDefaultPropertiesExtHkt {
  type: RuntimePluginUidlPropertiesExtHkt<
    RuntimeDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 运行时 UIDL 插件
 */
export const runtimePluginUidl: RuntimeRawPlugin<
  $RuntimePluginUidlPropertiesExtHkt,
  typeof runtimePluginContextType
> = {
  id: 'uidl',
  initContext(ctx) {
    const { initOptions } = ctx
    if (ctx.type === CONTEXT_TYPE_RUNTIME) {
      ctx.uidl = (initOptions as typeof ctx.initOptions).uidl
    } else {
      ctx.uidlElement = (initOptions as typeof ctx.initOptions).uidlElement
    }
  },
}
