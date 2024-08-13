import type { DepPluginUniteEditorPlugin, Editor } from '@p-lc/editor'
import type { editorDataStorePlugins } from './plugins'

/**
 * 数据编辑器插件
 */
export type DataEditorPlugin = DepPluginUniteEditorPlugin<
  (typeof editorDataStorePlugins)[number]
>

/**
 * 数据编辑器
 */
export type DataEditor = Editor<DataEditorPlugin>
