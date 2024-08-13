import { editorInlinePreviewerPlugins } from '@p-lc/previewer'
import { internalEditorReactPreviewerPlugins } from '../../react-previewer'

/**
 * 内部：编辑器 React 内联预览器插件
 */
export const internalEditorReactInlinePreviewerPlugins = []

/**
 * 编辑器 React 内联预览器插件
 */
export const editorReactInlinePreviewerPlugins = [
  // 外部
  ...editorInlinePreviewerPlugins,
  ...internalEditorReactPreviewerPlugins,
  // 内部
  ...internalEditorReactInlinePreviewerPlugins,
]
