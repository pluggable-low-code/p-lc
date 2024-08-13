import { editorPluginStyleStore } from './editor-plugin-style-store'
import { editorPluginStyleStoreInit } from './editor-plugin-style-store-init'

export * from './editor-plugin-style-store'
export * from './editor-plugin-style-store-init'

/**
 * 编辑器样式仓库插件
 */
export const editorStyleStorePlugins = [
  editorPluginStyleStore,
  editorPluginStyleStoreInit,
]
