import type { DepPluginUniteEditorPlugin, Editor } from '@p-lc/editor'
import { type editorSeitStorePlugins } from './plugins'

/**
 * 选中元素内联工具栏编辑器插件
 */
export type SeitEditorPlugin = DepPluginUniteEditorPlugin<
  (typeof editorSeitStorePlugins)[number]
>

/**
 * 选中元素内联工具栏编辑器
 */
export type SeitEditor = Editor<SeitEditorPlugin>
