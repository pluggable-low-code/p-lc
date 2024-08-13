import { runtimePreviewerPlugins } from '../../previewer'

/**
 * 内部：运行时内联预览器插件
 */
export const internalRuntimeInlinePreviewerPlugins = []

/**
 * 运行时内联预览器插件
 */
export const runtimeInlinePreviewerPlugins = [
  // 外部
  ...runtimePreviewerPlugins,
  // 内部
  ...internalRuntimeInlinePreviewerPlugins,
]
