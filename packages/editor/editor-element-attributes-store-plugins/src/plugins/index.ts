import { editorPluginElementAttributesStore } from './editor-plugin-element-attributes-store'
import { editorPluginElementAttributesStoreBind } from './editor-plugin-element-attributes-store-bind'

export * from './editor-plugin-element-attributes-store'
export * from './editor-plugin-element-attributes-store-bind'

/**
 * 编辑器元素属性仓库插件
 */
export const editorElementAttributesStorePlugins = [
  editorPluginElementAttributesStore,
  editorPluginElementAttributesStoreBind,
]
