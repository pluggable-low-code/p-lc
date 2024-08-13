import type {
  AnyMoboPlugin,
  InitOptionsByMoboPlugin,
  Mobo,
  MoboContext,
  MoboDefaultPropertiesExtHkt,
  MoboDefaultPropertiesExtObj,
  MoboPlugin,
  MoboPluginInitFn,
} from '@mobo-ts/mobo'
import type { LiteralObject } from '@p-lc/shared'
import type {
  controllerExtKeys,
  elementExtKeys,
  runtimeExtKeys,
} from './constants'
import type { runtimeDefaultPlugins } from './plugins'

/**
 * 运行时扩展键值
 */
export type RuntimeExtKey = (typeof runtimeExtKeys)[number]

/**
 * 控制器扩展键值
 */
export type ControllerExtKey = (typeof controllerExtKeys)[number]

/**
 * 元素扩展键值
 */
export type ElementExtKey = (typeof elementExtKeys)[number]

/**
 * 上下文扩展键值
 */
export type ContextExtKey = RuntimeExtKey & ControllerExtKey & ElementExtKey

/**
 * 所有扩展键值
 */
export type AllExtKey = RuntimeExtKey | ControllerExtKey | ElementExtKey

/**
 * 运行时
 */
export type Runtime<Plugin extends AnyRuntimePlugin> = Mobo<
  Plugin,
  RuntimeExtKey
>

/**
 * 控制器
 */
export type Controller<Plugin extends AnyRuntimePlugin> = MoboContext<
  Plugin,
  ControllerExtKey
>

/**
 * 元素
 */
export type Element<Plugin extends AnyRuntimePlugin> = MoboContext<
  Plugin,
  ElementExtKey
>

/**
 * 上下文
 */
export type Context<Plugin extends AnyRuntimePlugin> =
  | Runtime<Plugin>
  | Controller<Plugin>
  | Element<Plugin>

/**
 * 运行时初始化选项
 */
export type RuntimeInitOptions<Plugin extends AnyRuntimePlugin> =
  InitOptionsByMoboPlugin<Plugin, RuntimeExtKey>

/**
 * 控制器初始化选项
 */
export type ControllerInitOptions<Plugin extends AnyRuntimePlugin> =
  InitOptionsByMoboPlugin<Plugin, ControllerExtKey>

/**
 * 元素初始化选项
 */
export type ElementInitOptions<Plugin extends AnyRuntimePlugin> =
  InitOptionsByMoboPlugin<Plugin, ElementExtKey>

/**
 * 运行时默认属性扩展，对象形式
 */
export type RuntimeDefaultPropertiesExtObj =
  MoboDefaultPropertiesExtObj<AllExtKey>

/**
 * 运行时默认属性扩展，高等类型形式
 */
export type RuntimeDefaultPropertiesExtHkt = MoboDefaultPropertiesExtHkt

export type { MoboDefaultPropertiesExtHktPlugin as RuntimeDefaultPropertiesExtHktPlugin } from '@mobo-ts/mobo'

/**
 * 运行时默认属性扩展
 */
export type RuntimeDefaultPropertiesExt =
  | RuntimeDefaultPropertiesExtObj
  | RuntimeDefaultPropertiesExtHkt

/**
 * 运行时原始插件
 */
export interface RuntimeRawPlugin<
  PropertiesExt extends RuntimeDefaultPropertiesExt = LiteralObject,
  DepPlugin extends AnyRuntimePlugin = never,
> extends MoboPlugin<PropertiesExt> {
  /**
   * 初始化运行时
   */
  initRuntime?: MoboPluginInitFn<Runtime<this | DepPlugin>>
  /**
   * 初始化控制器
   */
  initController?: MoboPluginInitFn<Controller<this | DepPlugin>>
  /**
   * 初始化元素
   */
  initElement?: MoboPluginInitFn<Element<this | DepPlugin>>
  /**
   * 初始化上下文
   */
  initContext?: MoboPluginInitFn<Context<this | DepPlugin>>
}

/**
 * 任意运行时插件
 */
export type AnyRuntimePlugin = AnyMoboPlugin

/**
 * 运行时插件的依赖插件
 */
export type DepPluginOfRuntimePlugin<Plugin extends AnyRuntimePlugin> =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Plugin extends RuntimeRawPlugin<infer _PropertiesExt, infer DepPlugin>
    ? DepPlugin
    : never

/**
 * 运行时插件联合依赖插件
 */
export type DepPluginUniteRuntimePlugin<Plugin extends AnyRuntimePlugin> =
  | Plugin
  | DepPluginOfRuntimePlugin<Plugin>

//#region 对外提供的工具类型

/**
 * 运行时插件
 */
export type RuntimePlugin<
  PropertiesExt extends RuntimeDefaultPropertiesExt = LiteralObject,
  DepPlugin extends AnyRuntimePlugin = never,
> = RuntimeRawPlugin<PropertiesExt, RuntimeDefaultPlugin | DepPlugin>

/**
 * 运行时默认插件
 */
export type RuntimeDefaultPlugin = (typeof runtimeDefaultPlugins)[number]

/**
 * 默认运行时
 */
export type DefaultRuntime = Runtime<RuntimeDefaultPlugin>

/**
 * 默认控制器
 */
export type DefaultController = Controller<RuntimeDefaultPlugin>

/**
 * 默认元素
 */
export type DefaultElement = Element<RuntimeDefaultPlugin>

export type { PluginOfMoboContext as PluginOfContext } from '@mobo-ts/mobo'

export type { InitOptionsOfMoboContext as InitOptionsOfRuntime } from '@mobo-ts/mobo'

export type { InitOptionsOfMoboContext as InitOptionsOfRuntimeContext } from '@mobo-ts/mobo'

//#endregion
