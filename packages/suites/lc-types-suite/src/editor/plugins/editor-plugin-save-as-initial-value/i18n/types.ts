import type {
  I18N_KEY_SAVE_AS_INITIAL_VALUE,
  I18N_KEY_SAVE_AS_INITIAL_VALUE_MSG,
} from './keys'

/**
 * 编辑器另存为初始值插件国际化键值
 */
export type EditorPluginSaveAsInitialValueI18nKey =
  | typeof I18N_KEY_SAVE_AS_INITIAL_VALUE
  | typeof I18N_KEY_SAVE_AS_INITIAL_VALUE_MSG

/**
 * 编辑器另存为初始值插件国际化键值选项
 */
export type EditorPluginSaveAsInitialValueI18nKeyOptions = {
  [K in EditorPluginSaveAsInitialValueI18nKey]: void
}

/**
 * 编辑器另存为初始值插件国际化语言资源
 */
export type EditorPluginSaveAsInitialValueI18nLanguageResource = Record<
  keyof EditorPluginSaveAsInitialValueI18nKeyOptions,
  string
>
