import type {
  Controller,
  Element,
  Runtime,
  RuntimeDefaultPlugin,
} from '@p-lc/runtime'
import type { vueRuntimePlugins } from './plugins'

/**
 * Vue 运行时插件
 */
export type VueRuntimePlugin =
  | RuntimeDefaultPlugin
  | (typeof vueRuntimePlugins)[number]

/**
 * Vue 运行时
 */
export type VueRuntime = Runtime<VueRuntimePlugin>

/**
 * Vue 运行时控制器
 */
export type VueRuntimeController = Controller<VueRuntimePlugin>

/**
 * Vue 运行时元素
 */
export type VueRuntimeElement = Element<VueRuntimePlugin>
