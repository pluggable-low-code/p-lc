import { editorPluginUidlStore } from './editor-plugin-uidl-store'
import { editorPluginUidlStoreComponents } from './editor-plugin-uidl-store-components'
import { editorPluginUidlStoreEdit } from './editor-plugin-uidl-store-edit'
import { editorPluginUidlStoreInit } from './editor-plugin-uidl-store-init'

export * from './editor-plugin-uidl-store'
export * from './editor-plugin-uidl-store-components'
export * from './editor-plugin-uidl-store-edit'
export * from './editor-plugin-uidl-store-init'

/**
 * 编辑器 UIDL 仓库插件
 */
export const editorUidlStorePlugins = [
  editorPluginUidlStore,
  editorPluginUidlStoreEdit,
  editorPluginUidlStoreInit,
  editorPluginUidlStoreComponents,
]
