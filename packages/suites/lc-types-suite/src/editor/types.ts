import type {
  DepPluginUniteEditorPlugin,
  Editor,
  EditorDefaultPlugin,
} from '@p-lc/editor'
import type { lcTypesEditorPlugins } from './plugins'

/**
 * 低代码类型编辑器插件
 */
export type LcTypesEditorPlugin =
  | EditorDefaultPlugin
  | DepPluginUniteEditorPlugin<(typeof lcTypesEditorPlugins)[number]>

/**
 * 低代码类型编辑器
 */
export type LcTypesEditor = Editor<LcTypesEditorPlugin>
