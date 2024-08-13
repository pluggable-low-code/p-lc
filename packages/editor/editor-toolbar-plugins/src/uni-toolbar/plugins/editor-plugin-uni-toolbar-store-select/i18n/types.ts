import type { I18N_KEY_UNI_TOOLBAR_SELECT_PARENT } from './keys'

/**
 * 编辑器通用工具栏仓库选择插件国际化键值
 */
export type EditorPluginUniToolbarStoreSelectI18nKey =
  typeof I18N_KEY_UNI_TOOLBAR_SELECT_PARENT

/**
 * 编辑器通用工具栏仓库选择插件国际化键值选项
 */
export type EditorPluginUniToolbarStoreSelectI18nKeyOptions = {
  [K in EditorPluginUniToolbarStoreSelectI18nKey]: void
}

/**
 * 编辑器通用工具栏仓库选择插件国际化语言资源
 */
export type EditorPluginUniToolbarStoreSelectI18nLanguageResource = Record<
  keyof EditorPluginUniToolbarStoreSelectI18nKeyOptions,
  string
>
