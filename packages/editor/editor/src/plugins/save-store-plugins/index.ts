import { editorPluginSaveStore } from './editor-plugin-save-store'
import { editorPluginSaveStoreInit } from './editor-plugin-save-store-init'

export * from './editor-plugin-save-store'
export * from './editor-plugin-save-store-init'

/**
 * 编辑器保存仓库插件
 */
export const editorSaveStorePlugins = [
  editorPluginSaveStore,
  editorPluginSaveStoreInit,
]
