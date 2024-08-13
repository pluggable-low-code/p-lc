import type { DepPluginUniteEditorPlugin, Editor } from '@p-lc/editor'
import type { DepPluginUniteRuntimePlugin, Runtime } from '@p-lc/runtime'
import { type editorReactInlinePreviewerPlugins } from './editor-plugins'
import { type runtimeReactInlinePreviewerPlugins } from './runtime-plugins'

/**
 * React 内联预览器编辑器插件
 */
export type ReactInlinePreviewerEditorPlugin = DepPluginUniteEditorPlugin<
  (typeof editorReactInlinePreviewerPlugins)[number]
>

/**
 * React 内联预览器编辑器
 */
export type ReactInlinePreviewerEditor =
  Editor<ReactInlinePreviewerEditorPlugin>

/**
 * React 内联预览器运行时插件
 */
export type ReactInlinePreviewerRuntimePlugin = DepPluginUniteRuntimePlugin<
  (typeof runtimeReactInlinePreviewerPlugins)[number]
>

/**
 * React 内联预览器运行时
 */
export type ReactInlinePreviewerRuntime =
  Runtime<ReactInlinePreviewerRuntimePlugin>
