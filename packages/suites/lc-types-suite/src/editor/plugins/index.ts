import { editorAntdPlugins } from '@p-lc/editor-antd-plugins'
import {
  editorClassicalLayoutAdaptorPlugins,
  editorPluginClRipAdaptor,
} from '@p-lc/editor-classical-layout-adaptor-plugins'
import '@p-lc/editor-classical-layout-plugins'
import '@p-lc/editor-component-library-store-plugins'
import '@p-lc/editor-element-attributes-store-plugins'
import '@p-lc/editor-element-tree-store-plugins'
import { editorExpressionJsPlugins } from '@p-lc/editor-expression-js-plugins'
import '@p-lc/editor-i18n-edit-store-plugins'
import { editorLcTypesUiPlugins } from '@p-lc/editor-lc-types-ui-plugins'
import '@p-lc/editor-logo-store-plugins'
import '@p-lc/editor-toolbar-plugins'
import { editorReactInlinePreviewerPlugins } from '@p-lc/react-previewer'
import { editorPluginLcTypesStore } from './editor-plugin-lc-types-store'
import { editorPluginLcTypesStoreLayout } from './editor-plugin-lc-types-store-layout'
import { editorPluginLcTypesStoreMetadata } from './editor-plugin-lc-types-store-metadata'
import { editorPluginLcTypesStoreSave } from './editor-plugin-lc-types-store-save'
import { editorPluginLcTypesUidl } from './editor-plugin-lc-types-uidl'
import { editorPluginLcTypesUidlUtilsConfig } from './editor-plugin-lc-types-uidl-utils-config'
import { editorPluginSaveAsInitialValue } from './editor-plugin-save-as-initial-value'
import { editorPluginWrapAsBindableAttribute } from './editor-plugin-wrap-as-bindable-attribute'

export * from './editor-plugin-lc-types-store'
export * from './editor-plugin-lc-types-store-layout'
export * from './editor-plugin-lc-types-store-metadata'
export * from './editor-plugin-lc-types-store-save'
export * from './editor-plugin-lc-types-uidl'
export * from './editor-plugin-lc-types-uidl-utils-config'
export * from './editor-plugin-save-as-initial-value'
export * from './editor-plugin-wrap-as-bindable-attribute'

/**
 * 内部：低代码类型编辑器插件
 */
export const internalLcTypesEditorPlugins = [
  // 手动顺序
  editorPluginLcTypesStore,
  // 字典顺序
  editorPluginLcTypesStoreLayout,
  editorPluginLcTypesStoreMetadata,
  editorPluginLcTypesStoreSave,
  editorPluginLcTypesUidl,
  editorPluginLcTypesUidlUtilsConfig,
  editorPluginSaveAsInitialValue,
  editorPluginWrapAsBindableAttribute,
]

/**
 * 低代码类型编辑器插件
 */
export const lcTypesEditorPlugins = [
  // 外部：手动顺序
  ...editorLcTypesUiPlugins,
  ...editorAntdPlugins,
  ...editorClassicalLayoutAdaptorPlugins,
  ...editorExpressionJsPlugins,
  ...editorReactInlinePreviewerPlugins,
  editorPluginClRipAdaptor,
  // 内部
  ...internalLcTypesEditorPlugins,
]
