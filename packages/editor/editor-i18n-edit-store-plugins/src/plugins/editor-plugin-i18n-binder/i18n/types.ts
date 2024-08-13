import type { I18N_KEY_I18N_BINDER_NAME } from './keys'

/**
 * 编辑器国际化绑定器插件国际化键值
 */
export type EditorPluginI18nBinderI18nKey = typeof I18N_KEY_I18N_BINDER_NAME

/**
 * 编辑器国际化绑定器插件国际化键值选项
 */
export type EditorPluginI18nBinderI18nKeyOptions = {
  [K in EditorPluginI18nBinderI18nKey]: void
}

/**
 * 编辑器国际化绑定器插件国际化语言资源
 */
export type EditorPluginI18nBinderI18nLanguageResource = Record<
  keyof EditorPluginI18nBinderI18nKeyOptions,
  string
>
