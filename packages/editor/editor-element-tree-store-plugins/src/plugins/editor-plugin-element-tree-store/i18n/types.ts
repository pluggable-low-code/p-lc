import type { I18N_KEY_ELEMENT_TREE_TITLE } from './keys'

/**
 * 编辑器元素树仓库插件国际化键值
 */
export type EditorPluginElementTreeStoreI18nKey =
  typeof I18N_KEY_ELEMENT_TREE_TITLE

/**
 * 编辑器元素树仓库插件国际化键值选项
 */
export type EditorPluginElementTreeStoreI18nKeyOptions = {
  [K in EditorPluginElementTreeStoreI18nKey]: void
}

/**
 * 编辑器元素树仓库插件国际化语言资源
 */
export type EditorPluginElementTreeStoreI18nLanguageResource = Record<
  keyof EditorPluginElementTreeStoreI18nKeyOptions,
  string
>
