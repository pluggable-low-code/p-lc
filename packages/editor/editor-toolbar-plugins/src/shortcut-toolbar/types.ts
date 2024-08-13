import type { DepPluginUniteEditorPlugin, Editor } from '@p-lc/editor'
import { type editorShortcutToolbarStorePlugins } from './plugins'

/**
 * 选中元素内联工具栏编辑器插件
 */
export type ShortcutToolbarEditorPlugin = DepPluginUniteEditorPlugin<
  (typeof editorShortcutToolbarStorePlugins)[number]
>

/**
 * 选中元素内联工具栏编辑器
 */
export type ShortcutToolbarEditor = Editor<ShortcutToolbarEditorPlugin>
