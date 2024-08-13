import type { DepPluginUniteEditorPlugin, Editor } from '@p-lc/editor'
import type { DepPluginUniteRuntimePlugin, Runtime } from '@p-lc/runtime'
import { type editorInlinePreviewerPlugins } from './editor-plugins'
import { type runtimeInlinePreviewerPlugins } from './runtime-plugins'

/**
 * 内联预览器编辑器插件
 */
export type InlinePreviewerEditorPlugin = DepPluginUniteEditorPlugin<
  (typeof editorInlinePreviewerPlugins)[number]
>

/**
 * 内联预览器编辑器
 */
export type InlinePreviewerEditor = Editor<InlinePreviewerEditorPlugin>

/**
 * 内联预览器运行时插件
 */
export type InlinePreviewerRuntimePlugin = DepPluginUniteRuntimePlugin<
  (typeof runtimeInlinePreviewerPlugins)[number]
>

/**
 * 内联预览器运行时
 */
export type InlinePreviewerRuntime = Runtime<InlinePreviewerRuntimePlugin>
