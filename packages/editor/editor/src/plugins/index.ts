import { editorContextMenuStorePlugins } from './context-menu-store-plugins'
import { editorDndStorePlugins } from './dnd-store-plugins'
import { editorPluginEditorReactContext } from './editor-plugin-editor-react-context'
import { editorPluginEmitter } from './editor-plugin-emitter'
import { editorPluginName } from './editor-plugin-name'
import { editorPluginRender } from './editor-plugin-render'
import { editorPluginRootHost } from './editor-plugin-root-host'
import { editorElementStorePlugins } from './element-store-plugins'
import { editorI18nStorePlugins } from './i18n-store-plugins'
import { editorLayoutStorePlugins } from './layout-store-plugins'
import { editorPdStorePlugins } from './pd-store-plugins'
import { editorSaveStorePlugins } from './save-store-plugins'
import { editorStyleStorePlugins } from './style-store-plugins'
import { editorUidlStorePlugins } from './uidl-store-plugins'
import { editorUidlUtilsConfigPlugins } from './uidl-utils-config-plugins'

export * from './context-menu-store-plugins'
export * from './dnd-store-plugins'
export * from './editor-plugin-editor-react-context'
export * from './editor-plugin-emitter'
export * from './editor-plugin-name'
export * from './editor-plugin-render'
export * from './editor-plugin-root-host'
export * from './element-store-plugins'
export * from './i18n-store-plugins'
export * from './layout-store-plugins'
export * from './pd-store-plugins'
export * from './save-store-plugins'
export * from './style-store-plugins'
export * from './uidl-store-plugins'
export * from './uidl-utils-config-plugins'

/**
 * 编辑器默认插件
 */
export const editorDefaultPlugins = [
  // 手动顺序
  editorPluginName,
  editorPluginEmitter,
  editorPluginRender, // overwrite render
  ...editorStyleStorePlugins,
  ...editorI18nStorePlugins,
  ...editorUidlUtilsConfigPlugins,
  ...editorUidlStorePlugins,
  ...editorLayoutStorePlugins,
  ...editorPdStorePlugins,
  ...editorElementStorePlugins,
  ...editorDndStorePlugins, // overwrite render
  ...editorContextMenuStorePlugins, // overwrite render
  ...editorSaveStorePlugins,
  editorPluginRootHost, // overwrite render
  editorPluginEditorReactContext, // overwrite render
]
