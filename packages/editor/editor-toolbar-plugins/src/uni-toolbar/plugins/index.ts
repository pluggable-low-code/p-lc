import { editorPluginUniToolbarStore } from './editor-plugin-uni-toolbar-store'
import { editorPluginUniToolbarStoreCopyPaste } from './editor-plugin-uni-toolbar-store-copy-paste'
import { editorPluginUniToolbarStoreDeleteElement } from './editor-plugin-uni-toolbar-store-delete-element'
import { editorPluginUniToolbarStoreLanguage } from './editor-plugin-uni-toolbar-store-language'
import { editorPluginUniToolbarStoreSave } from './editor-plugin-uni-toolbar-store-save'
import { editorPluginUniToolbarStoreSelect } from './editor-plugin-uni-toolbar-store-select'
import { editorPluginUniToolbarStoreUndoRedo } from './editor-plugin-uni-toolbar-store-undo-redo'

export * from './editor-plugin-uni-toolbar-store'
export * from './editor-plugin-uni-toolbar-store-copy-paste'
export * from './editor-plugin-uni-toolbar-store-delete-element'
export * from './editor-plugin-uni-toolbar-store-save'
export * from './editor-plugin-uni-toolbar-store-select'
export * from './editor-plugin-uni-toolbar-store-undo-redo'

/**
 * 编辑器通用工具栏仓库插件
 */
export const editorUniToolbarStorePlugins = [
  // 手动顺序
  editorPluginUniToolbarStore,
  // 字典顺序
  editorPluginUniToolbarStoreCopyPaste,
  editorPluginUniToolbarStoreDeleteElement,
  editorPluginUniToolbarStoreLanguage,
  editorPluginUniToolbarStoreSave,
  editorPluginUniToolbarStoreSelect,
  editorPluginUniToolbarStoreUndoRedo,
]
