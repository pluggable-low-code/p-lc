import { editorPluginI18nBinder } from './editor-plugin-i18n-binder'
import { editorPluginI18nEditStore } from './editor-plugin-i18n-edit-store'

export * from './editor-plugin-i18n-binder'
export * from './editor-plugin-i18n-edit-store'

/**
 * 编辑器国际化编辑仓库插件
 */
export const editorI18nEditStorePlugins = [
  editorPluginI18nEditStore,
  editorPluginI18nBinder,
]
