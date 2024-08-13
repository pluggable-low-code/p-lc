import {
  type I18N_KEY_PLEASE_SELECT_ELEMENT,
  type I18N_KEY_SOMETHING_WENT_WRONG_IN_CD,
} from './keys'

/**
 * 编辑器元素属性仓库插件国际化键值
 */
export type EditorPluginElementAttributesStoreI18nKey =
  | typeof I18N_KEY_SOMETHING_WENT_WRONG_IN_CD
  | typeof I18N_KEY_PLEASE_SELECT_ELEMENT

/**
 * 编辑器元素属性仓库插件国际化键值选项
 */
export type EditorPluginElementAttributesStoreI18nKeyOptions = {
  [K in EditorPluginElementAttributesStoreI18nKey]: void
}

/**
 * 编辑器元素属性仓库插件国际化语言资源
 */
export type EditorPluginElementAttributesStoreI18nLanguageResource = Record<
  keyof EditorPluginElementAttributesStoreI18nKeyOptions,
  string
>
