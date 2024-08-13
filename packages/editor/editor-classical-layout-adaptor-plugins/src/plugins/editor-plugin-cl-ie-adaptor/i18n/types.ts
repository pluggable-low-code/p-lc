import type { I18N_KEY_I18N_EDIT_ICON_TIP } from './keys'

/**
 * 编辑器经典布局国际化编辑适配器插件国际化键值
 */
export type EditorPluginClIeAdaptorI18nKey = typeof I18N_KEY_I18N_EDIT_ICON_TIP

/**
 * 编辑器经典布局国际化编辑适配器插件国际化键值选项
 */
export type EditorPluginClIeAdaptorI18nKeyOptions = {
  [K in EditorPluginClIeAdaptorI18nKey]: void
}

/**
 * 编辑器经典布局国际化编辑适配器插件国际化语言资源
 */
export type EditorPluginClIeAdaptorI18nLanguageResource = Record<
  keyof EditorPluginClIeAdaptorI18nKeyOptions,
  string
>
