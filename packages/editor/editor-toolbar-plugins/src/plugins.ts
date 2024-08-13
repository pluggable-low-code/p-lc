import { editorActionToolbarStorePlugins } from './action-toolbar'
import { editorSeitStorePlugins } from './selected-element-inline-toolbar'
import { editorShortcutToolbarStorePlugins } from './shortcut-toolbar'
import { editorUniToolbarStorePlugins } from './uni-toolbar'

/**
 * 编辑器工具栏插件
 */
export const editorToolbarPlugins = [
  ...editorActionToolbarStorePlugins,
  ...editorSeitStorePlugins,
  ...editorShortcutToolbarStorePlugins,
  ...editorUniToolbarStorePlugins,
]
