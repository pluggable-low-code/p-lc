import type { DepPluginUniteEditorPlugin, Editor } from '@p-lc/editor'
import type { editorComponentLibraryStorePlugins } from './plugins'

/**
 * 组件库编辑器插件
 */
export type ComponentLibraryEditorPlugin = DepPluginUniteEditorPlugin<
  (typeof editorComponentLibraryStorePlugins)[number]
>

/**
 * 组件库编辑器
 */
export type ComponentLibraryEditor = Editor<ComponentLibraryEditorPlugin>
