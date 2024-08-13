import type { I18N_KEY_DATA_ICON_TIP } from './keys'

/**
 * 编辑器经典布局数据适配器插件国际化键值
 */
export type EditorPluginClDataAdaptorI18nKey = typeof I18N_KEY_DATA_ICON_TIP

/**
 * 编辑器经典布局数据适配器插件国际化键值选项
 */
export type EditorPluginClDataAdaptorI18nKeyOptions = {
  [K in EditorPluginClDataAdaptorI18nKey]: void
}

/**
 * 编辑器经典布局数据适配器插件国际化语言资源
 */
export type EditorPluginClDataAdaptorI18nLanguageResource = Record<
  keyof EditorPluginClDataAdaptorI18nKeyOptions,
  string
>
