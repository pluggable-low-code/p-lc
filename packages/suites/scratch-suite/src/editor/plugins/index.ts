import { editorClassicalLayoutPlugins } from '@p-lc/editor-classical-layout-plugins'
import { editorI18nextPlugins } from '@p-lc/editor-i18next-plugins'
import { editorPluginDemoTabs } from './editor-plugin-demo-tabs'

export * from './editor-plugin-demo-tabs'

/**
 * 内部：起步编辑器插件
 */
export const internalScratchEditorPlugins = [
  // 字典顺序
  editorPluginDemoTabs,
]

/**
 * 起步编辑器插件
 */
export const scratchEditorPlugins = [
  // 外部：字典顺序
  ...editorClassicalLayoutPlugins,
  ...editorI18nextPlugins,
  // 内部
  ...internalScratchEditorPlugins,
]
