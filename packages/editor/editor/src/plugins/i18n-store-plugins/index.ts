import { editorPluginI18nStore } from './editor-plugin-i18n-store'
import { editorPluginI18nStoreInit } from './editor-plugin-i18n-store-init'
import { editorPluginI18nStoreLoadState } from './editor-plugin-i18n-store-load-state'

export * from './editor-plugin-i18n-store'
export * from './editor-plugin-i18n-store-init'
export * from './editor-plugin-i18n-store-load-state'

/**
 * 编辑器国际化仓库插件
 */
export const editorI18nStorePlugins = [
  // 手动顺序
  editorPluginI18nStore,
  editorPluginI18nStoreInit,
  editorPluginI18nStoreLoadState,
]
