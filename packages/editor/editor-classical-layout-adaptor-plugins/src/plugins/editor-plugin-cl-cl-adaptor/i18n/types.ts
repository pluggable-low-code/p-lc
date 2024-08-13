import type { I18N_KEY_COMPONENT_LIBRARY_ICON_TIP } from './keys'

/**
 * 编辑器经典布局组件库适配器插件国际化键值
 */
export type EditorPluginClClAdaptorI18nKey =
  typeof I18N_KEY_COMPONENT_LIBRARY_ICON_TIP

/**
 * 编辑器经典布局组件库适配器插件国际化键值选项
 */
export type EditorPluginClClAdaptorI18nKeyOptions = {
  [K in EditorPluginClClAdaptorI18nKey]: void
}

/**
 * 编辑器经典布局组件库适配器插件国际化语言资源
 */
export type EditorPluginClClAdaptorI18nLanguageResource = Record<
  keyof EditorPluginClClAdaptorI18nKeyOptions,
  string
>
