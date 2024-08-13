import type {
  DepPluginUniteEditorPlugin,
  Editor,
  EditorDefaultPlugin,
} from '@p-lc/editor'
import type { ravEditorPlugins } from './plugins'

/**
 * RAV 编辑器插件
 */
export type RavEditorPlugin =
  | EditorDefaultPlugin
  | DepPluginUniteEditorPlugin<(typeof ravEditorPlugins)[number]>

/**
 * RAV 编辑器
 */
export type RavEditor = Editor<RavEditorPlugin>
