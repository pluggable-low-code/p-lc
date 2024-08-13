import type { I18N_KEY_UNI_TOOLBAR_DELETE_ELEMENT } from './keys'

/**
 * 编辑器通用工具栏仓库删除元素插件国际化键值
 */
export type EditorPluginUniToolbarStoreDeleteElementI18nKey =
  typeof I18N_KEY_UNI_TOOLBAR_DELETE_ELEMENT

/**
 * 编辑器通用工具栏仓库删除元素插件国际化键值选项
 */
export type EditorPluginUniToolbarStoreDeleteElementI18nKeyOptions = {
  [K in EditorPluginUniToolbarStoreDeleteElementI18nKey]: void
}

/**
 * 编辑器通用工具栏仓库删除元素插件国际化语言资源
 */
export type EditorPluginUniToolbarStoreDeleteElementI18nLanguageResource =
  Record<keyof EditorPluginUniToolbarStoreDeleteElementI18nKeyOptions, string>
