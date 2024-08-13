import type { DepPluginUniteEditorPlugin, Editor } from '@p-lc/editor'
import { type editorUniToolbarStorePlugins } from './plugins'

/**
 * 通用工具栏编辑器插件
 */
export type UniToolbarEditorPlugin = DepPluginUniteEditorPlugin<
  (typeof editorUniToolbarStorePlugins)[number]
>

/**
 * 通用工具栏编辑器
 */
export type UniToolbarEditor = Editor<UniToolbarEditorPlugin>
