import { editorPluginElementTreeStore } from './editor-plugin-element-tree-store'
import { editorPluginElementTreeStoreDnd } from './editor-plugin-element-tree-store-dnd'
import { editorPluginElementTreeStoreInit } from './editor-plugin-element-tree-store-init'

export * from './editor-plugin-element-tree-store'
export * from './editor-plugin-element-tree-store-dnd'
export * from './editor-plugin-element-tree-store-init'

/**
 * 编辑器元素树仓库插件
 */
export const editorElementTreeStorePlugins = [
  editorPluginElementTreeStore,
  editorPluginElementTreeStoreInit,
  editorPluginElementTreeStoreDnd,
]
