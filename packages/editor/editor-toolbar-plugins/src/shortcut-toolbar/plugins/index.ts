import { editorPluginShortcutToolbarStore } from './editor-plugin-shortcut-toolbar-store'
import { editorPluginShortcutToolbarStoreEditableFilter } from './editor-plugin-shortcut-toolbar-store-editable-filter'

export * from './editor-plugin-shortcut-toolbar-store'
export * from './editor-plugin-shortcut-toolbar-store-editable-filter'

/**
 * 编辑器快捷键工具栏仓库插件
 */
export const editorShortcutToolbarStorePlugins = [
  editorPluginShortcutToolbarStore,
  editorPluginShortcutToolbarStoreEditableFilter,
]
