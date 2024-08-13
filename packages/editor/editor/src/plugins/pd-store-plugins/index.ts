import { editorPluginPdStore } from './editor-plugin-pd-store'
import { editorPluginPdStoreInit } from './editor-plugin-pd-store-init'

export * from './editor-plugin-pd-store'
export * from './editor-plugin-pd-store-init'

/**
 * 编辑器 PD 仓库插件
 */
export const editorPdStorePlugins = [
  editorPluginPdStore,
  editorPluginPdStoreInit,
]
