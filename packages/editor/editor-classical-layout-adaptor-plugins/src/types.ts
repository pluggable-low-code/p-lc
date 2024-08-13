import type { DepPluginUniteEditorPlugin, Editor } from '@p-lc/editor'
import type { editorClassicalLayoutAdaptorPlugins } from './plugins'

/**
 * 经典布局适配器编辑器插件
 */
export type ClassicalLayoutAdaptorEditorPlugin = DepPluginUniteEditorPlugin<
  (typeof editorClassicalLayoutAdaptorPlugins)[number]
>

/**
 * 经典布局适配器编辑器
 */
export type ClassicalLayoutAdaptorEditor =
  Editor<ClassicalLayoutAdaptorEditorPlugin>
