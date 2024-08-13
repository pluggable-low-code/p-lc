import type { DepPluginUniteEditorPlugin, Editor } from '@p-lc/editor'
import { type editorLogoStorePlugins } from './plugins'

/**
 * 标识编辑器插件
 */
export type LogoEditorPlugin = DepPluginUniteEditorPlugin<
  (typeof editorLogoStorePlugins)[number]
>

/**
 * 标识编辑器
 */
export type LogoEditor = Editor<LogoEditorPlugin>
