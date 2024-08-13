import { editorClassicalLayoutPlugins } from '@p-lc/editor-classical-layout-plugins'
import { editorComponentLibraryStorePlugins } from '@p-lc/editor-component-library-store-plugins'
import { editorElementAttributesStorePlugins } from '@p-lc/editor-element-attributes-store-plugins'
import { editorElementTreeStorePlugins } from '@p-lc/editor-element-tree-store-plugins'
import { editorI18nEditStorePlugins } from '@p-lc/editor-i18n-edit-store-plugins'
import { editorLogoStorePlugins } from '@p-lc/editor-logo-store-plugins'
import { editorToolbarPlugins } from '@p-lc/editor-toolbar-plugins'
import { editorPluginClAtAdaptor } from './editor-plugin-cl-at-adaptor'
import { editorPluginClClAdaptor } from './editor-plugin-cl-cl-adaptor'
import { editorPluginClEaAdaptor } from './editor-plugin-cl-ea-adaptor'
import { editorPluginClEtAdaptor } from './editor-plugin-cl-et-adaptor'
import { editorPluginClEtDndAdaptor } from './editor-plugin-cl-et-dnd-adaptor'
import { editorPluginClIeAdaptor } from './editor-plugin-cl-ie-adaptor'
import { editorPluginClLogoAdaptor } from './editor-plugin-cl-logo-adaptor'

export * from './editor-plugin-cl-at-adaptor'
export * from './editor-plugin-cl-cl-adaptor'
export * from './editor-plugin-cl-ea-adaptor'
export * from './editor-plugin-cl-et-adaptor'
export * from './editor-plugin-cl-et-dnd-adaptor'
export * from './editor-plugin-cl-ie-adaptor'
export * from './editor-plugin-cl-logo-adaptor'

/**
 * 内部：编辑器经典布局适配器插件
 */
export const internalEditorClassicalLayoutAdaptorPlugins = [
  editorPluginClClAdaptor,
  editorPluginClEtAdaptor,
  editorPluginClIeAdaptor,
  editorPluginClEtDndAdaptor,
  editorPluginClEaAdaptor,
  editorPluginClAtAdaptor,
  editorPluginClLogoAdaptor,
]

/**
 * 编辑器经典布局适配器插件
 */
export const editorClassicalLayoutAdaptorPlugins = [
  // 外部：字典顺序
  ...editorComponentLibraryStorePlugins,
  ...editorElementAttributesStorePlugins,
  ...editorElementTreeStorePlugins,
  ...editorLogoStorePlugins,
  ...editorToolbarPlugins,
  // 外部：手动顺序
  ...editorI18nEditStorePlugins,
  ...editorClassicalLayoutPlugins,
  // 内部
  ...internalEditorClassicalLayoutAdaptorPlugins,
]
