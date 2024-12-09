import type {
  I18N_KEY_UNI_TOOLBAR_SAVE,
  I18N_KEY_UNI_TOOLBAR_SAVE_FAILED,
  I18N_KEY_UNI_TOOLBAR_SAVE_SUCCESSFUL,
} from './keys'

/**
 * 编辑器通用工具栏仓库保存插件国际化键值
 */
export type EditorPluginUniToolbarStoreSaveI18nKey =
  | typeof I18N_KEY_UNI_TOOLBAR_SAVE
  | typeof I18N_KEY_UNI_TOOLBAR_SAVE_SUCCESSFUL
  | typeof I18N_KEY_UNI_TOOLBAR_SAVE_FAILED

/**
 * 编辑器通用工具栏仓库保存插件国际化键值选项
 */
export type EditorPluginUniToolbarStoreSaveI18nKeyOptions = {
  [K in EditorPluginUniToolbarStoreSaveI18nKey]: void
}

/**
 * 编辑器通用工具栏仓库保存插件国际化语言资源
 */
export type EditorPluginUniToolbarStoreSaveI18nLanguageResource = Record<
  keyof EditorPluginUniToolbarStoreSaveI18nKeyOptions,
  string
>
