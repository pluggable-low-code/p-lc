import type { Controller, Element, Runtime } from '@p-lc/runtime'
import type { runtimeMobxPlugins } from './plugins'

/**
 * MobX 运行时插件
 */
export type MobxRuntimePlugin = (typeof runtimeMobxPlugins)[number]

/**
 * MobX 运行时
 */
export type MobxRuntime = Runtime<MobxRuntimePlugin>

/**
 * MobX 运行时控制器
 */
export type MobxRuntimeController = Controller<MobxRuntimePlugin>

/**
 * MobX 运行时元素
 */
export type MobxRuntimeElement = Element<MobxRuntimePlugin>
