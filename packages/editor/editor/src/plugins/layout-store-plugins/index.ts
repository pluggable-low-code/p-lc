import { editorPluginLayoutStore } from './editor-plugin-layout-store'
import { editorPluginLayoutStoreInit } from './editor-plugin-layout-store-init'
import { editorPluginLayoutStoreLoadState } from './editor-plugin-layout-store-load-state'

export * from './editor-plugin-layout-store'
export * from './editor-plugin-layout-store-init'
export * from './editor-plugin-layout-store-load-state'

/**
 * 编辑器布局仓库插件
 */
export const editorLayoutStorePlugins = [
  // 手动顺序
  editorPluginLayoutStore,
  editorPluginLayoutStoreInit,
  editorPluginLayoutStoreLoadState,
]
