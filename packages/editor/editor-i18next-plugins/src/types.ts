import type { DepPluginUniteEditorPlugin, Editor } from '@p-lc/editor'
import { type editorI18nextPlugins } from './plugins'

/**
 * i18next 编辑器插件
 */
export type I18nextEditorPlugin = DepPluginUniteEditorPlugin<
  (typeof editorI18nextPlugins)[number]
>

/**
 * i18next 编辑器
 */
export type I18nextEditor = Editor<I18nextEditorPlugin>
