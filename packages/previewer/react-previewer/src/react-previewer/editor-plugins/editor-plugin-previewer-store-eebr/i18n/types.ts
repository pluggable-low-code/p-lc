import type { I18N_KEY_SOMETHING_WENT_WRONG_IN_THE_ELEMENT } from './keys'

/**
 * 编辑器预览器仓库 React 元素错误边界插件国际化键值
 */
export type EditorPluginPreviewerStoreEebrI18nKey =
  typeof I18N_KEY_SOMETHING_WENT_WRONG_IN_THE_ELEMENT

/**
 * 编辑器预览器仓库 React 元素错误边界插件国际化键值选项
 */
export type EditorPluginPreviewerStoreEebrI18nKeyOptions = {
  [K in EditorPluginPreviewerStoreEebrI18nKey]: void
}

/**
 * 编辑器预览器仓库 React 元素错误边界插件国际化语言资源
 */
export type EditorPluginPreviewerStoreEebrI18nLanguageResource = Record<
  keyof EditorPluginPreviewerStoreEebrI18nKeyOptions,
  string
>
