import type {
  I18N_KEY_CD,
  I18N_KEY_CD_DESCRIPTION,
  I18N_KEY_CD_EXPORT_PATH,
  I18N_KEY_CD_GROUP_NAME,
  I18N_KEY_CD_HIDDEN,
  I18N_KEY_CD_ICON,
  I18N_KEY_CD_IMPL_FOR,
  I18N_KEY_CD_IMPL_IF,
  I18N_KEY_CD_IMPL_STYLE,
  I18N_KEY_CD_IMPLEMENTS,
  I18N_KEY_CD_INITIAL_VALUE,
  I18N_KEY_CD_METADATA,
  I18N_KEY_CD_NAME,
  I18N_KEY_CD_TYPE,
  I18N_KEY_EDIT_METADATA,
  I18N_KEY_PD_METADATA,
  I18N_KEY_PD_NAME,
} from './keys'

/**
 * 编辑器低代码类型仓库布局插件国际化键值
 */
export type EditorPluginLcTypesStoreLayoutI18nKey =
  | typeof I18N_KEY_CD
  | typeof I18N_KEY_EDIT_METADATA
  | typeof I18N_KEY_CD_METADATA
  | typeof I18N_KEY_PD_METADATA
  | typeof I18N_KEY_CD_TYPE
  | typeof I18N_KEY_CD_NAME
  | typeof I18N_KEY_CD_GROUP_NAME
  | typeof I18N_KEY_CD_DESCRIPTION
  | typeof I18N_KEY_CD_ICON
  | typeof I18N_KEY_CD_HIDDEN
  | typeof I18N_KEY_CD_IMPLEMENTS
  | typeof I18N_KEY_CD_IMPL_STYLE
  | typeof I18N_KEY_CD_IMPL_IF
  | typeof I18N_KEY_CD_IMPL_FOR
  | typeof I18N_KEY_CD_EXPORT_PATH
  | typeof I18N_KEY_CD_INITIAL_VALUE
  | typeof I18N_KEY_PD_NAME

/**
 * 编辑器低代码类型仓库布局插件国际化键值选项
 */
export type EditorPluginLcTypesStoreLayoutI18nKeyOptions = {
  [K in EditorPluginLcTypesStoreLayoutI18nKey]: void
}

/**
 * 编辑器低代码类型仓库布局插件国际化语言资源
 */
export type EditorPluginLcTypesStoreLayoutI18nLanguageResource = Record<
  keyof EditorPluginLcTypesStoreLayoutI18nKeyOptions,
  string
>
