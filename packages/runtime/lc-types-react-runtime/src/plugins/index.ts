import {
  runtimePluginEmitter,
  runtimePluginEmitterHotUpdateUidl,
  runtimePluginEmitterHotUpdateUidlRecreateView,
} from '@p-lc/runtime-emitter-plugins'
import {
  runtimePluginExpressionBox,
  runtimePluginExpressionJs,
} from '@p-lc/runtime-expression-plugins'
import { runtimeI18nPlugins } from '@p-lc/runtime-i18n-plugins'
import {
  runtimeMobxPlugins,
  runtimePluginMobxControlledData,
  runtimePluginMobxEmitter,
  runtimePluginMobxView,
} from '@p-lc/runtime-mobx-plugins'
import { runtimeMobxReactPlugins } from '@p-lc/runtime-mobx-react-plugins'
import '@p-lc/shared'
import { runtimePluginLcTypesExpose } from './runtime-plugin-lc-types-expose'
import { runtimePluginLcTypesProps } from './runtime-plugin-lc-types-props'
import { runtimePluginLcTypesUidl } from './runtime-plugin-lc-types-uidl'
import { runtimePluginLcTypesUidlUtilsConfig } from './runtime-plugin-lc-types-uidl-utils-config'
import { runtimePluginLogicPath } from './runtime-plugin-logic-path'
import { runtimePluginWrapExpression } from './runtime-plugin-wrap-expression'

export * from './runtime-plugin-lc-types-expose'
export * from './runtime-plugin-lc-types-props'
export * from './runtime-plugin-lc-types-uidl'
export * from './runtime-plugin-lc-types-uidl-utils-config'
export * from './runtime-plugin-logic-path'
export * from './runtime-plugin-wrap-expression'

/**
 * 内部：低代码类型 React 运行时插件
 */
export const internalLcTypesReactRuntimePlugins = [
  // 手动顺序
  runtimePluginLcTypesUidl,
  runtimePluginLcTypesUidlUtilsConfig,
  runtimePluginLogicPath,
  runtimePluginWrapExpression,
  runtimePluginLcTypesExpose,
  runtimePluginLcTypesProps,
]

/**
 * 低代码类型 React 运行时插件
 */
export const lcTypesReactRuntimePlugins = [
  // 外部：字典顺序
  runtimePluginExpressionBox,
  runtimePluginExpressionJs,
  runtimePluginMobxControlledData,
  runtimePluginMobxView,
  ...runtimeI18nPlugins,
  // 外部：手动顺序
  ...runtimeMobxPlugins,
  ...runtimeMobxReactPlugins,
  runtimePluginEmitter,
  runtimePluginEmitterHotUpdateUidl,
  runtimePluginEmitterHotUpdateUidlRecreateView,
  runtimePluginMobxEmitter,
  // 内部
  ...internalLcTypesReactRuntimePlugins,
]
