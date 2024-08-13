import type { Controller, Element, Runtime } from '@p-lc/runtime'
import { type runtimeI18nPlugins } from './plugins'

/**
 * 国际化运行时插件
 */
export type I18nRuntimePlugin = (typeof runtimeI18nPlugins)[number]

/**
 * 国际化运行时
 */
export type I18nRuntime = Runtime<I18nRuntimePlugin>

/**
 * 国际化运行时控制器
 */
export type I18nRuntimeController = Controller<I18nRuntimePlugin>

/**
 * 国际化运行时元素
 */
export type I18nRuntimeElement = Element<I18nRuntimePlugin>
