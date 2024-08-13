import { editorPreviewerPlugins } from '../../previewer'
import { editorPluginPreviewerStoreInline } from './editor-plugin-previewer-store-inline'
import { editorPluginPreviewerStoreInlineInit } from './editor-plugin-previewer-store-inline-init'
import { editorPluginPreviewerStoreMaskPopupContainer } from './editor-plugin-previewer-store-mask-popup-container'

export * from './editor-plugin-previewer-store-inline'
export * from './editor-plugin-previewer-store-inline-init'
export * from './editor-plugin-previewer-store-mask-popup-container'

/**
 * 内部：编辑器内联预览器插件
 */
export const internalEditorInlinePreviewerPlugins = [
  editorPluginPreviewerStoreInline,
  editorPluginPreviewerStoreInlineInit,
  editorPluginPreviewerStoreMaskPopupContainer,
]

/**
 * 编辑器内联预览器插件
 */
export const editorInlinePreviewerPlugins = [
  // 外部
  ...editorPreviewerPlugins,
  // 内部
  ...internalEditorInlinePreviewerPlugins,
]
