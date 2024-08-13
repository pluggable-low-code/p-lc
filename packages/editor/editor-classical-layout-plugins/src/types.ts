import type { DepPluginUniteEditorPlugin, Editor } from '@p-lc/editor'
import type { editorClassicalLayoutPlugins } from './plugins'

/**
 * 经典布局编辑器插件
 */
export type ClassicalLayoutEditorPlugin = DepPluginUniteEditorPlugin<
  (typeof editorClassicalLayoutPlugins)[number]
>

/**
 * 经典布局编辑器
 */
export type ClassicalLayoutEditor = Editor<ClassicalLayoutEditorPlugin>
