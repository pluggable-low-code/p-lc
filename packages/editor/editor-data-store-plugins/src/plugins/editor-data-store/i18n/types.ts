import type { I18N_KEY_DATA_TITLE } from './keys'

/**
 * 编辑器数据仓库插件国际化键值
 */
export type EditorPluginDataStoreI18nKey = typeof I18N_KEY_DATA_TITLE

/**
 * 编辑器数据仓库插件国际化键值选项
 */
export type EditorPluginDataStoreI18nKeyOptions = {
  [K in EditorPluginDataStoreI18nKey]: void
}

/**
 * 编辑器数据仓库插件国际化语言资源
 */
export type EditorPluginDataStoreI18nLanguageResource = Record<
  keyof EditorPluginDataStoreI18nKeyOptions,
  string
>
