import type {
  I18N_KEY_I18N_EDIT_ADD_KEY,
  I18N_KEY_I18N_EDIT_DELETE_KEY,
  I18N_KEY_I18N_EDIT_EDIT_KEY,
  I18N_KEY_I18N_EDIT_KEY,
  I18N_KEY_I18N_EDIT_KEY_EXISTS,
  I18N_KEY_I18N_EDIT_TITLE,
} from './keys'

/**
 * 编辑器国际化编辑仓库插件国际化键值
 */
export type EditorPluginI18nEditStoreI18nKey =
  | typeof I18N_KEY_I18N_EDIT_TITLE
  | typeof I18N_KEY_I18N_EDIT_ADD_KEY
  | typeof I18N_KEY_I18N_EDIT_EDIT_KEY
  | typeof I18N_KEY_I18N_EDIT_DELETE_KEY
  | typeof I18N_KEY_I18N_EDIT_KEY
  | typeof I18N_KEY_I18N_EDIT_KEY_EXISTS

/**
 * 编辑器国际化编辑仓库插件国际化键值选项
 */
export type EditorPluginI18nEditStoreI18nKeyOptions = {
  [K in EditorPluginI18nEditStoreI18nKey]: void
}

/**
 * 编辑器国际化编辑仓库插件国际化语言资源
 */
export type EditorPluginI18nEditStoreI18nLanguageResource = Record<
  keyof EditorPluginI18nEditStoreI18nKeyOptions,
  string
>
