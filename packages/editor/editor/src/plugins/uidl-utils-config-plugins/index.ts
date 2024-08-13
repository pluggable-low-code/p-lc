import { editorPluginUidlUtilsConfig } from './editor-plugin-uidl-utils-config'
import { editorPluginUidlUtilsConfigInit } from './editor-plugin-uidl-utils-config-init'

export * from './editor-plugin-uidl-utils-config'
export * from './editor-plugin-uidl-utils-config-init'

/**
 * 编辑器 UIDL 工具集配置插件
 */
export const editorUidlUtilsConfigPlugins = [
  editorPluginUidlUtilsConfig,
  editorPluginUidlUtilsConfigInit,
]
