import {
  runtimePluginExpressionBox,
  runtimePluginExpressionJs,
} from '@p-lc/runtime-expression-plugins'
import { runtimeI18nPlugins } from '@p-lc/runtime-i18n-plugins'
import {
  runtimeMobxPlugins,
  runtimePluginMobxData,
  runtimePluginMobxDataInit,
  runtimePluginMobxView,
} from '@p-lc/runtime-mobx-plugins'
import { runtimeMobxReactPlugins } from '@p-lc/runtime-mobx-react-plugins'
import '@p-lc/shared'

/**
 * antd 运行时插件
 */
export const antdRuntimePlugins = [
  // 外部：字典顺序
  runtimePluginExpressionBox,
  runtimePluginExpressionJs,
  runtimePluginMobxData,
  runtimePluginMobxDataInit,
  runtimePluginMobxView,
  ...runtimeI18nPlugins,
  // 外部：手动顺序
  ...runtimeMobxPlugins,
  ...runtimeMobxReactPlugins,
]
