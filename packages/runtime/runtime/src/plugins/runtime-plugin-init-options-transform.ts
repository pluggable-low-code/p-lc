import type { AnyFunction, SoftPropOf } from '@p-lc/shared'
import { batchTransform } from '@p-lc/shared'
import type {
  AnyRuntimePlugin,
  Context,
  ControllerInitOptions,
  ElementInitOptions,
  Runtime,
  RuntimeDefaultPropertiesExtHkt,
  RuntimeDefaultPropertiesExtHktPlugin,
  RuntimeRawPlugin,
} from '../types'
import { type runtimePluginKey } from './runtime-plugin-key'
import { type runtimePluginParent } from './runtime-plugin-parent'
import { type runtimePluginUidl } from './runtime-plugin-uidl'

/**
 * 运行时初始化选项转换插件属性扩展高等类型
 */
export interface RuntimePluginInitOptionsTransfromPropertiesExtHkt<
  Plugin extends AnyRuntimePlugin,
> {
  runtime: {
    /**
     * 初始化选项转换
     */
    initOptionsTransform: InitOptionsTransform<Plugin>
    /**
     * 转换初始化选项
     */
    transformInitOptions: TransformInitOptions<Plugin>
  }
}

/**
 * 初始化选项转换
 */
export interface InitOptionsTransform<Plugin extends AnyRuntimePlugin> {
  /**
   * 控制器，统一在 runtimePluginInitContext 里调用
   */
  controller: ControllerIot<Plugin>[]
  /**
   * 元素，统一在 runtimePluginInitContext 里调用
   */
  element: ElementIot<Plugin>[]
}

/**
 * 控制器初始化选项转换
 */
export type ControllerIot<Plugin extends AnyRuntimePlugin> = (
  rawInitOptions: ControllerInitOptions<Plugin>,
  ctx: Context<Plugin>,
) => ControllerInitOptions<Plugin> | void

/**
 * 元素初始化选项转换
 */
export type ElementIot<Plugin extends AnyRuntimePlugin> = (
  rawInitOptions: ElementInitOptions<Plugin>,
  ctx: Context<Plugin>,
) => ElementInitOptions<Plugin> | void

/**
 * 最终的初始化选项转换
 */
export type FinalInitOptionsTransform<Plugin extends AnyRuntimePlugin> =
  SoftPropOf<Runtime<Plugin>, 'initOptionsTransform'>

/**
 * 转换初始化选项
 */
export type TransformInitOptions<Plugin extends AnyRuntimePlugin> = <
  Type extends keyof FinalInitOptionsTransform<Plugin>,
>(
  type: Type,
  ...args: Parameters<FinalInitOptionsTransform<Plugin>[Type][number]>
) => Parameters<FinalInitOptionsTransform<Plugin>[Type][number]>[0]

/**
 * RuntimePluginInitOptionsTransfromPropertiesExtHkt 辅助类型
 */
export interface $RuntimePluginInitOptionsTransfromPropertiesExtHkt
  extends RuntimeDefaultPropertiesExtHkt {
  type: RuntimePluginInitOptionsTransfromPropertiesExtHkt<
    RuntimeDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 运行时初始化选项转换插件
 */
export const runtimePluginInitOptionsTransfrom: RuntimeRawPlugin<
  $RuntimePluginInitOptionsTransfromPropertiesExtHkt,
  | typeof runtimePluginKey
  | typeof runtimePluginParent
  | typeof runtimePluginUidl
> = {
  id: 'init-options-transform',
  initRuntime(ctx) {
    ctx.initOptionsTransform = {
      controller: [],
      element: [],
    }
    ctx.transformInitOptions = ((type, ...args) => {
      const fns = ctx.initOptionsTransform[type]
      return (batchTransform as AnyFunction)(fns, ...args)
    }) as typeof ctx.transformInitOptions
  },
}
