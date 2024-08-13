import { editorPluginContextMenuStore } from './editor-plugin-context-menu-store'
import { editorPluginContextMenuStoreElement } from './editor-plugin-context-menu-store-element'

export * from './context-menu'
export * from './editor-plugin-context-menu-store'
export * from './editor-plugin-context-menu-store-element'
export * from './use-context-menu'

/**
 * 编辑器上下文菜单仓库插件
 */
export const editorContextMenuStorePlugins = [
  editorPluginContextMenuStore,
  editorPluginContextMenuStoreElement,
]
