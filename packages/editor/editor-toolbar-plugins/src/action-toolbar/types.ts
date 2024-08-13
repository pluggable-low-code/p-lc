import type { DepPluginUniteEditorPlugin, Editor } from '@p-lc/editor'
import { type editorActionToolbarStorePlugins } from './plugins'

/**
 * 操作工具栏编辑器插件
 */
export type ActionToolbarEditorPlugin = DepPluginUniteEditorPlugin<
  (typeof editorActionToolbarStorePlugins)[number]
>

/**
 * 操作工具栏编辑器
 */
export type ActionToolbarEditor = Editor<ActionToolbarEditorPlugin>
