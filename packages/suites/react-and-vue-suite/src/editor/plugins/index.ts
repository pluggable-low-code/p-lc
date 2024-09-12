import { editorClassicalLayoutPlugins } from '@p-lc/editor-classical-layout-plugins'
import { editorPluginDemoTabs } from './editor-plugin-demo-tabs'

export * from './editor-plugin-demo-tabs'

/**
 * 内部：RAV 编辑器插件
 */
export const internalRavEditorPlugins = [
  // 字典顺序
  editorPluginDemoTabs,
]

/**
 * RAV 编辑器插件
 */
export const ravEditorPlugins = [
  // 外部：字典顺序
  ...editorClassicalLayoutPlugins,
  // 内部
  ...internalRavEditorPlugins,
]
