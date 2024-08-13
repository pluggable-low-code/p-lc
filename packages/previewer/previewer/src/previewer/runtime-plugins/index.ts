import {
  runtimePluginEmitter,
  runtimePluginEmitterHotUpdateUidl,
  runtimePluginEmitterHotUpdateUidlRecreateView,
} from '@p-lc/runtime-emitter-plugins'
import { runtimePluginElementDom } from './runtime-plugin-element-dom'
import { runtimePluginI18nStrings } from './runtime-plugin-i18n-strings'
import { runtimePluginPreviewer } from './runtime-plugin-previewer'
import { runtimePluginPreviewerContextMenu } from './runtime-plugin-previewer-context-menu'
import { runtimePluginPreviewerHotUpdateUidl } from './runtime-plugin-previewer-hot-update-uidl'
import { runtimePluginPreviewerIdElement } from './runtime-plugin-previewer-id-element'
import { runtimePluginPreviewerPdForPreview } from './runtime-plugin-previewer-pd-for-preview'
import { runtimePluginPreviewerPosition } from './runtime-plugin-previewer-position'
import { runtimePluginPreviewerResize } from './runtime-plugin-previewer-resize'
import { runtimePluginPreviewerSelect } from './runtime-plugin-previewer-select'
import { runtimePluginPreviewerSyncPd } from './runtime-plugin-previewer-sync-pd'
import { runtimePluginPreviewerViewEffect } from './runtime-plugin-previewer-view-effect'

export * from './runtime-plugin-element-dom'
export * from './runtime-plugin-i18n-strings'
export * from './runtime-plugin-previewer'
export * from './runtime-plugin-previewer-context-menu'
export * from './runtime-plugin-previewer-hot-update-uidl'
export * from './runtime-plugin-previewer-id-element'
export * from './runtime-plugin-previewer-pd-for-preview'
export * from './runtime-plugin-previewer-position'
export * from './runtime-plugin-previewer-resize'
export * from './runtime-plugin-previewer-select'
export * from './runtime-plugin-previewer-sync-pd'
export * from './runtime-plugin-previewer-view-effect'

/**
 * 内部：运行时预览器插件
 */
export const internalRuntimePreviewerPlugins = [
  // 手动顺序
  runtimePluginI18nStrings,
  runtimePluginPreviewer,
  // 字典顺序
  runtimePluginElementDom,
  runtimePluginPreviewerContextMenu,
  runtimePluginPreviewerHotUpdateUidl,
  runtimePluginPreviewerIdElement,
  runtimePluginPreviewerPdForPreview,
  runtimePluginPreviewerPosition,
  runtimePluginPreviewerResize,
  runtimePluginPreviewerSelect,
  runtimePluginPreviewerSyncPd,
  runtimePluginPreviewerViewEffect,
]

/**
 * 运行时预览器插件
 */
export const runtimePreviewerPlugins = [
  // 外部
  runtimePluginEmitter,
  runtimePluginEmitterHotUpdateUidl,
  runtimePluginEmitterHotUpdateUidlRecreateView,
  // 内部
  ...internalRuntimePreviewerPlugins,
]
