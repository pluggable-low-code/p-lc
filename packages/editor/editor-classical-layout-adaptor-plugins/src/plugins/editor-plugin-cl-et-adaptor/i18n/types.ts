import type { I18N_KEY_ELEMENT_TREE_ICON_TIP } from './keys'

/**
 * 编辑器经典布局元素树适配器插件国际化键值
 */
export type EditorPluginClEtAdaptorI18nKey =
  typeof I18N_KEY_ELEMENT_TREE_ICON_TIP

/**
 * 编辑器经典布局元素树适配器插件国际化键值选项
 */
export type EditorPluginClEtAdaptorI18nKeyOptions = {
  [K in EditorPluginClEtAdaptorI18nKey]: void
}

/**
 * 编辑器经典布局元素树适配器插件国际化语言资源
 */
export type EditorPluginClEtAdaptorI18nLanguageResource = Record<
  keyof EditorPluginClEtAdaptorI18nKeyOptions,
  string
>
