import type {
  I18N_KEY_UNI_TOOLBAR_REDO_TIP,
  I18N_KEY_UNI_TOOLBAR_UNDO_TIP,
} from './keys'

/**
 * 编辑器通用工具栏仓库撤销重做插件国际化键值
 */
export type EditorPluginUniToolbarStoreUndoRedoI18nKey =
  | typeof I18N_KEY_UNI_TOOLBAR_UNDO_TIP
  | typeof I18N_KEY_UNI_TOOLBAR_REDO_TIP

/**
 * 编辑器通用工具栏仓库撤销重做插件国际化键值选项
 */
export type EditorPluginUniToolbarStoreUndoRedoI18nKeyOptions = {
  [K in EditorPluginUniToolbarStoreUndoRedoI18nKey]: void
}

/**
 * 编辑器通用工具栏仓库撤销重做插件国际化语言资源
 */
export type EditorPluginUniToolbarStoreUndoRedoI18nLanguageResource = Record<
  keyof EditorPluginUniToolbarStoreUndoRedoI18nKeyOptions,
  string
>
