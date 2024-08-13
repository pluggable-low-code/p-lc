import { runtimePreviewerPlugins } from '@p-lc/previewer'
import { runtimePluginElementDomReact } from './runtime-plugin-element-dom-react'
import { runtimePluginElementErrorBoundaryReact } from './runtime-plugin-element-error-boundary-react'
import { runtimePluginPreviewerViewEffectReact } from './runtime-plugin-previewer-view-effect-react'
import { runtimePluginSlotPlaceholderReact } from './runtime-plugin-slot-placeholder'

export * from './runtime-plugin-element-dom-react'
export * from './runtime-plugin-element-error-boundary-react'
export * from './runtime-plugin-previewer-view-effect-react'
export * from './runtime-plugin-slot-placeholder'

/**
 * 内部：运行时 React 预览器插件
 */
export const internalRuntimeReactPreviewerPlugins = [
  runtimePluginElementErrorBoundaryReact,
  runtimePluginElementDomReact,
  runtimePluginSlotPlaceholderReact,
  runtimePluginPreviewerViewEffectReact,
]

/**
 * 运行时 React 预览器插件
 */
export const runtimeReactPreviewerPlugins = [
  // 外部
  ...runtimePreviewerPlugins,
  // 内部
  ...internalRuntimeReactPreviewerPlugins,
]
