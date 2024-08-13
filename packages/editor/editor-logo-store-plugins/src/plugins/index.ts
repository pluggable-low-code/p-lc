import { editorPluginLogoStore } from './editor-plugin-logo-store'
import { editorPluginLogoStoreInit } from './editor-plugin-logo-store-init'

export * from './editor-plugin-logo-store'
export * from './editor-plugin-logo-store-init'

/**
 * 编辑器标识仓库插件
 */
export const editorLogoStorePlugins = [
  editorPluginLogoStore,
  editorPluginLogoStoreInit,
]
