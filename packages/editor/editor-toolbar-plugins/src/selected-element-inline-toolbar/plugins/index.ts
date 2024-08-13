import { editorPluginSeitStore } from './editor-plugin-seit-store'
import { editorPluginSeitStoreElementName } from './editor-plugin-seit-store-element-name'

export * from './editor-plugin-seit-store'
export * from './editor-plugin-seit-store-element-name'

/**
 * 编辑器选中元素内联工具栏仓库插件
 */
export const editorSeitStorePlugins = [
  editorPluginSeitStore,
  editorPluginSeitStoreElementName,
]
