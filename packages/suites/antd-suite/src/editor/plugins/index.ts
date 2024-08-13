import { editorAntdPlugins } from '@p-lc/editor-antd-plugins'
import {
  editorClassicalLayoutAdaptorPlugins,
  editorPluginClDataAdaptor,
  editorPluginClRipAdaptor,
} from '@p-lc/editor-classical-layout-adaptor-plugins'
import '@p-lc/editor-classical-layout-plugins'
import '@p-lc/editor-component-library-store-plugins'
import { editorPluginDataStore } from '@p-lc/editor-data-store-plugins'
import '@p-lc/editor-element-attributes-store-plugins'
import '@p-lc/editor-element-tree-store-plugins'
import { editorExpressionJsPlugins } from '@p-lc/editor-expression-js-plugins'
import '@p-lc/editor-i18n-edit-store-plugins'
import { editorLcTypesUiPlugins } from '@p-lc/editor-lc-types-ui-plugins'
import '@p-lc/editor-logo-store-plugins'
import '@p-lc/editor-toolbar-plugins'
import { editorReactInlinePreviewerPlugins } from '@p-lc/react-previewer'

/**
 * 内部：antd 编辑器插件
 */
export const internalAntdEditorPlugins = []

/**
 * antd 编辑器插件
 */
export const antdEditorPlugins = [
  // 外部：手动顺序
  ...editorLcTypesUiPlugins,
  ...editorAntdPlugins,
  // 外部：字典顺序
  ...editorClassicalLayoutAdaptorPlugins,
  ...editorExpressionJsPlugins,
  ...editorReactInlinePreviewerPlugins,
  editorPluginClRipAdaptor,
  editorPluginDataStore,
  editorPluginClDataAdaptor,
  // 内部
  ...internalAntdEditorPlugins,
]
