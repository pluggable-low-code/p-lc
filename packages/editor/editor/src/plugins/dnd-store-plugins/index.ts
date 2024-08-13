import { editorPluginDndStore } from './editor-plugin-dnd-store'
import { editorPluginDndStoreComponentRenderer } from './editor-plugin-dnd-store-component-renderer'
import { editorPluginDndStoreElementRenderer } from './editor-plugin-dnd-store-element-renderer'
import { editorPluginDndStoreMask } from './editor-plugin-dnd-store-mask'

export * from './components'
export * from './editor-plugin-dnd-store'
export * from './editor-plugin-dnd-store-component-renderer'
export * from './editor-plugin-dnd-store-element-renderer'
export * from './editor-plugin-dnd-store-mask'
export * from './hooks'
export * from './utils'

/**
 * 编辑器拖放仓库插件
 */
export const editorDndStorePlugins = [
  editorPluginDndStore,
  editorPluginDndStoreMask,
  editorPluginDndStoreElementRenderer,
  editorPluginDndStoreComponentRenderer,
]
