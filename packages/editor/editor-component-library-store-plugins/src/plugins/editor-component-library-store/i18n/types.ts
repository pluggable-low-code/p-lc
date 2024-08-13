import type { I18N_KEY_COMPONENT_LIBRARY_TITLE } from './keys'

/**
 * 编辑器组件库仓库插件国际化键值
 */
export type EditorPluginComponentLibraryStoreI18nKey =
  typeof I18N_KEY_COMPONENT_LIBRARY_TITLE

/**
 * 编辑器组件库仓库插件国际化键值选项
 */
export type EditorPluginComponentLibraryStoreI18nKeyOptions = {
  [K in EditorPluginComponentLibraryStoreI18nKey]: void
}

/**
 * 编辑器组件库仓库插件国际化语言资源
 */
export type EditorPluginComponentLibraryStoreI18nLanguageResource = Record<
  keyof EditorPluginComponentLibraryStoreI18nKeyOptions,
  string
>
