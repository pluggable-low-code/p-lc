import type { DepPluginUniteEditorPlugin, Editor } from '@p-lc/editor'
import { type editorLcTypesUiPlugins } from './plugins'

/**
 * 低代码类型 UI 编辑器插件
 */
export type LcTypesUiEditorPlugin = DepPluginUniteEditorPlugin<
  (typeof editorLcTypesUiPlugins)[number]
>

/**
 * 低代码类型 UI 编辑器
 */
export type LcTypesUiEditor = Editor<LcTypesUiEditorPlugin>
