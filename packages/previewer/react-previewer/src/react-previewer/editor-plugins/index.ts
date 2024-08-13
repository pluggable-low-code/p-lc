import { editorPreviewerPlugins } from '@p-lc/previewer'
import { editorPluginPreviewerStoreEebr } from './editor-plugin-previewer-store-eebr'

export * from './editor-plugin-previewer-store-eebr'

/**
 * 内部：编辑器 React 预览器插件
 */
export const internalEditorReactPreviewerPlugins = [
  editorPluginPreviewerStoreEebr,
]

/**
 * 编辑器 React 预览器插件
 */
export const editorReactPreviewerPlugins = [
  // 外部
  ...editorPreviewerPlugins,
  // 内部
  ...internalEditorReactPreviewerPlugins,
]
