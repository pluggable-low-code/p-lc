import type {
  DepPluginUniteEditorPlugin,
  Editor,
  EditorDefaultPlugin,
} from '@p-lc/editor'
import type { scratchEditorPlugins } from './plugins'

/**
 * 起步编辑器插件
 */
export type ScratchEditorPlugin =
  | EditorDefaultPlugin
  | DepPluginUniteEditorPlugin<(typeof scratchEditorPlugins)[number]>

/**
 * 起步编辑器
 */
export type ScratchEditor = Editor<ScratchEditorPlugin>
