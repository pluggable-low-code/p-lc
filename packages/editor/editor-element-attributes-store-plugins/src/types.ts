import type { DepPluginUniteEditorPlugin, Editor } from '@p-lc/editor'
import { type editorElementAttributesStorePlugins } from './plugins'

/**
 * 元素属性编辑器插件
 */
export type ElementAttributesEditorPlugin = DepPluginUniteEditorPlugin<
  (typeof editorElementAttributesStorePlugins)[number]
>

/**
 * 元素属性编辑器
 */
export type ElementAttributesEditor = Editor<ElementAttributesEditorPlugin>
