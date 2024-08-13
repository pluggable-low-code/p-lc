import { editorPluginPreviewerStore } from './editor-plugin-previewer-store'
import { editorPluginPreviewerStoreContextMenu } from './editor-plugin-previewer-store-context-menu'
import { editorPluginPreviewerStoreDnd } from './editor-plugin-previewer-store-dnd'
import { editorPluginPreviewerStoreHotUpdateUidl } from './editor-plugin-previewer-store-hot-update-uidl'
import { editorPluginPreviewerStoreMask } from './editor-plugin-previewer-store-mask'
import { editorPluginPreviewerStoreMaskSelect } from './editor-plugin-previewer-store-mask-select'
import { editorPluginPreviewerStorePosition } from './editor-plugin-previewer-store-position'
import { editorPluginPreviewerStoreResize } from './editor-plugin-previewer-store-resize'
import { editorPluginPreviewerStoreSelect } from './editor-plugin-previewer-store-select'
import { editorPluginPreviewerStoreSyncPd } from './editor-plugin-previewer-store-sync-pd'
import { editorPluginPreviewerStoreViewEffect } from './editor-plugin-previewer-store-view-effect'

export * from './editor-plugin-previewer-store'
export * from './editor-plugin-previewer-store-dnd'
export * from './editor-plugin-previewer-store-hot-update-uidl'
export * from './editor-plugin-previewer-store-mask'
export * from './editor-plugin-previewer-store-mask-select'
export * from './editor-plugin-previewer-store-position'
export * from './editor-plugin-previewer-store-resize'
export * from './editor-plugin-previewer-store-select'
export * from './editor-plugin-previewer-store-sync-pd'
export * from './editor-plugin-previewer-store-view-effect'

/**
 * 内部编辑器预览器插件
 */
export const internalEditorPreviewerPlugins = [
  editorPluginPreviewerStore,
  editorPluginPreviewerStoreContextMenu,
  editorPluginPreviewerStoreSyncPd,
  editorPluginPreviewerStoreHotUpdateUidl,
  editorPluginPreviewerStoreViewEffect,
  editorPluginPreviewerStorePosition,
  editorPluginPreviewerStoreMask,
  editorPluginPreviewerStoreMaskSelect,
  editorPluginPreviewerStoreResize,
  editorPluginPreviewerStoreSelect,
  editorPluginPreviewerStoreDnd,
]

/**
 * 编辑器预览器插件
 */
export const editorPreviewerPlugins = internalEditorPreviewerPlugins
