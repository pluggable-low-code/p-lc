import type { DepPluginUniteEditorPlugin, Editor } from '@p-lc/editor'
import { type editorElementTreeStorePlugins } from './plugins'

/**
 * 元素树编辑器插件
 */
export type ElementTreeEditorPlugin = DepPluginUniteEditorPlugin<
  (typeof editorElementTreeStorePlugins)[number]
>

/**
 * 元素树编辑器
 */
export type ElementTreeEditor = Editor<ElementTreeEditorPlugin>
