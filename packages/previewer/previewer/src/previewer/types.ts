import type { DepPluginOfEditorPlugin, Editor } from '@p-lc/editor'
import type { DepPluginUniteRuntimePlugin, Runtime } from '@p-lc/runtime'
import { type editorPreviewerPlugins } from './editor-plugins'
import { type runtimePreviewerPlugins } from './runtime-plugins'

/**
 * 预览器编辑器插件
 */
export type PreviewerEditorPlugin = DepPluginOfEditorPlugin<
  (typeof editorPreviewerPlugins)[number]
>

/**
 * 预览器编辑器
 */
export type PreviewerEditor = Editor<PreviewerEditorPlugin>

/**
 * 预览器运行时插件
 */
export type PreviewerRuntimePlugin = DepPluginUniteRuntimePlugin<
  (typeof runtimePreviewerPlugins)[number]
>

/**
 * 预览器运行时
 */
export type PreviewerRuntime = Runtime<PreviewerRuntimePlugin>
