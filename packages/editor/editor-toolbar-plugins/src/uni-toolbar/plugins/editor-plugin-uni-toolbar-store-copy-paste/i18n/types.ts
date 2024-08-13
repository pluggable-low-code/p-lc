import type {
  I18N_KEY_UNI_TOOLBAR_COPY,
  I18N_KEY_UNI_TOOLBAR_PASTE,
} from './keys'

/**
 * 编辑器通用工具栏仓库复制粘贴插件国际化键值
 */
export type EditorPluginUniToolbarStoreCopyPasteI18nKey =
  | typeof I18N_KEY_UNI_TOOLBAR_COPY
  | typeof I18N_KEY_UNI_TOOLBAR_PASTE

/**
 * 编辑器通用工具栏仓库复制粘贴插件国际化键值选项
 */
export type EditorPluginUniToolbarStoreCopyPasteI18nKeyOptions = {
  [K in EditorPluginUniToolbarStoreCopyPasteI18nKey]: void
}

/**
 * 编辑器通用工具栏仓库复制粘贴插件国际化语言资源
 */
export type EditorPluginUniToolbarStoreCopyPasteI18nLanguageResource = Record<
  keyof EditorPluginUniToolbarStoreCopyPasteI18nKeyOptions,
  string
>
