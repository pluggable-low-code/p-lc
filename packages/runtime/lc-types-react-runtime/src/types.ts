import type { ReactRuntimePlugin } from '@p-lc/react-runtime'
import type { Controller, Element, Runtime } from '@p-lc/runtime'
import { type lcTypesReactRuntimePlugins } from './plugins'

/**
 * 低代码类型 React 运行时插件
 */
export type LcTypesReactRuntimePlugin =
  | ReactRuntimePlugin
  | (typeof lcTypesReactRuntimePlugins)[number]

/**
 * 低代码类型 React 运行时
 */
export type LcTypesReactRuntime = Runtime<LcTypesReactRuntimePlugin>

/**
 * 低代码类型 React 运行时控制器
 */
export type LcTypesReactRuntimeController =
  Controller<LcTypesReactRuntimePlugin>

/**
 * 低代码类型 React 运行时元素
 */
export type LcTypesReactRuntimeElement = Element<LcTypesReactRuntimePlugin>
