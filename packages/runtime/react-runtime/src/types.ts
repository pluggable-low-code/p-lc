import type {
  Controller,
  Element,
  Runtime,
  RuntimeDefaultPlugin,
} from '@p-lc/runtime'
import type { reactRuntimePlugins } from './plugins'

/**
 * React 运行时插件
 */
export type ReactRuntimePlugin =
  | RuntimeDefaultPlugin
  | (typeof reactRuntimePlugins)[number]

/**
 * React 运行时
 */
export type ReactRuntime = Runtime<ReactRuntimePlugin>

/**
 * React 运行时控制器
 */
export type ReactRuntimeController = Controller<ReactRuntimePlugin>

/**
 * React 运行时元素
 */
export type ReactRuntimeElement = Element<ReactRuntimePlugin>
