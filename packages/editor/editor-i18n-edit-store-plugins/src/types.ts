import type { DepPluginUniteEditorPlugin, Editor } from '@p-lc/editor'
import { type editorI18nEditStorePlugins } from './plugins'

/**
 * 国际化编辑编辑器插件
 */
export type I18nEditEditorPlugin = DepPluginUniteEditorPlugin<
  (typeof editorI18nEditStorePlugins)[number]
>

/**
 * 国际化编辑编辑器
 */
export type I18nEditEditor = Editor<I18nEditEditorPlugin>
