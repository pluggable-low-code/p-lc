import type { Controller, Element, Runtime } from '@p-lc/runtime'
import type { runtimeMobxReactPlugins } from './plugins'

/**
 * MobX React 运行时插件
 */
export type MobxReactRuntimePlugin = (typeof runtimeMobxReactPlugins)[number]

/**
 * MobX React 运行时
 */
export type MobxReactRuntime = Runtime<MobxReactRuntimePlugin>

/**
 * MobX React 运行时控制器
 */
export type MobxReactRuntimeController = Controller<MobxReactRuntimePlugin>

/**
 * MobX React 运行时元素
 */
export type MobxReactRuntimeElement = Element<MobxReactRuntimePlugin>
