import type { ReactRuntimePlugin } from '@p-lc/react-runtime'
import type { Controller, Element, Runtime } from '@p-lc/runtime'
import type { antdRuntimePlugins } from './plugins'

/**
 * antd 运行时插件
 */
export type AntdRuntimePlugin =
  | ReactRuntimePlugin
  | (typeof antdRuntimePlugins)[number]

/**
 * antd 运行时
 */
export type AntdRuntime = Runtime<AntdRuntimePlugin>

/**
 * antd 运行时控制器
 */
export type AntdRuntimeController = Controller<AntdRuntimePlugin>

/**
 * antd 运行时元素
 */
export type AntdRuntimeElement = Element<AntdRuntimePlugin>
