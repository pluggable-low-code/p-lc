import type { DepPluginUniteEditorPlugin, Editor } from '@p-lc/editor'
import { type editorToolbarPlugins } from './plugins'

/**
 * 工具栏编辑器插件
 */
export type ToolbarEditorPlugin = DepPluginUniteEditorPlugin<
  (typeof editorToolbarPlugins)[number]
>

/**
 * 工具栏编辑器
 */
export type ToolbarEditor = Editor<ToolbarEditorPlugin>
