import type { I18N_KEY_WRAP_AS_BINDABLE_ATTRIBUTE } from './keys'

/**
 * 编辑器包装为可绑定属性插件国际化键值
 */
export type EditorPluginWrapAsBindableAttributeI18nKey =
  typeof I18N_KEY_WRAP_AS_BINDABLE_ATTRIBUTE

/**
 * 编辑器包装为可绑定属性插件国际化键值选项
 */
export type EditorPluginWrapAsBindableAttributeI18nKeyOptions = {
  [K in EditorPluginWrapAsBindableAttributeI18nKey]: void
}

/**
 * 编辑器包装为可绑定属性插件国际化语言资源
 */
export type EditorPluginWrapAsBindableAttributeI18nLanguageResource = Record<
  keyof EditorPluginWrapAsBindableAttributeI18nKeyOptions,
  string
>
