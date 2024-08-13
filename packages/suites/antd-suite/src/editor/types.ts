import type {
  DepPluginUniteEditorPlugin,
  Editor,
  EditorDefaultPlugin,
} from '@p-lc/editor'
import type { antdEditorPlugins } from './plugins'

/**
 * antd 编辑器插件
 */
export type AntdEditorPlugin =
  | EditorDefaultPlugin
  | DepPluginUniteEditorPlugin<(typeof antdEditorPlugins)[number]>

/**
 * antd 编辑器
 */
export type AntdEditor = Editor<AntdEditorPlugin>
