import { runtimeInlinePreviewerPlugins } from '@p-lc/previewer'
import '@p-lc/runtime-emitter-plugins'
import {
  runtimePluginMobxEmitter,
  runtimePluginMobxView,
} from '@p-lc/runtime-mobx-plugins'
import { internalRuntimeReactPreviewerPlugins } from '../../react-previewer'

/**
 * 内部：运行时 React 内联预览器插件
 */
export const internalRuntimeReactInlinePreviewerPlugins = []

/**
 * 运行时 React 内联预览器插件
 */
export const runtimeReactInlinePreviewerPlugins = [
  // 外部
  ...runtimeInlinePreviewerPlugins,
  runtimePluginMobxEmitter,
  runtimePluginMobxView,
  ...internalRuntimeReactPreviewerPlugins,
  // 内部
  ...internalRuntimeReactInlinePreviewerPlugins,
]
