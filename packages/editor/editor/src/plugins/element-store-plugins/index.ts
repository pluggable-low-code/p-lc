import { editorPluginElementStore } from './editor-plugin-element-store'
import { editorPluginElementStoreCopyPaste } from './editor-plugin-element-store-copy-paste'
import { editorPluginElementStoreEdit } from './editor-plugin-element-store-edit'
import { editorPluginElementStoreFind } from './editor-plugin-element-store-find'
import { editorPluginElementStoreIs } from './editor-plugin-element-store-is'
import { editorPluginElementStoreSelect } from './editor-plugin-element-store-select'

export * from './editor-plugin-element-store'
export * from './editor-plugin-element-store-copy-paste'
export * from './editor-plugin-element-store-edit'
export * from './editor-plugin-element-store-find'
export * from './editor-plugin-element-store-is'
export * from './editor-plugin-element-store-select'

/**
 * 编辑器元素仓库插件
 */
export const editorElementStorePlugins = [
  // 手动顺序
  editorPluginElementStore,
  // 字典顺序
  editorPluginElementStoreCopyPaste,
  editorPluginElementStoreEdit,
  editorPluginElementStoreFind,
  editorPluginElementStoreIs,
  editorPluginElementStoreSelect,
]
