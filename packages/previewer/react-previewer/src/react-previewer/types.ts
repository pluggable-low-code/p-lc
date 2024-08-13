import type { DepPluginUniteEditorPlugin, Editor } from '@p-lc/editor'
import type { DepPluginUniteRuntimePlugin, Runtime } from '@p-lc/runtime'
import { type editorReactPreviewerPlugins } from './editor-plugins'
import { type runtimeReactPreviewerPlugins } from './runtime-plugins'

/**
 * React 预览器编辑器插件
 */
export type ReactPreviewerEditorPlugin = DepPluginUniteEditorPlugin<
  (typeof editorReactPreviewerPlugins)[number]
>

/**
 * React 预览器编辑器
 */
export type ReactPreviewerEditor = Editor<ReactPreviewerEditorPlugin>

/**
 * React 预览器运行时插件
 */
export type ReactPreviewerRuntimePlugin = DepPluginUniteRuntimePlugin<
  (typeof runtimeReactPreviewerPlugins)[number]
>

/**
 * React 预览器运行时
 */
export type ReactPreviewerRuntime = Runtime<ReactPreviewerRuntimePlugin>
