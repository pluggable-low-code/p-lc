import type { DepPluginUniteEditorPlugin, Editor } from '@p-lc/editor'
import { type editorAntdPlugins } from './plugins'

/**
 * antd 编辑器插件
 */
export type AntdEditorPlugin = DepPluginUniteEditorPlugin<
  (typeof editorAntdPlugins)[number]
>

/**
 * antd 编辑器
 */
export type AntdEditor = Editor<AntdEditorPlugin>
