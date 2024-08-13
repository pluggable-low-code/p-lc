import type { UidlUtilsConfig } from '@p-lc/uidl-utils'
import { merge } from 'lodash-uni'
import type {
  AnyEditorPlugin,
  EditorDefaultPropertiesExtHkt,
  EditorDefaultPropertiesExtHktPlugin,
  EditorRawPlugin,
} from '../../types'
import type { UidlStoreUidl } from '../uidl-store-plugins'
import { type editorPluginUidlUtilsConfig } from './editor-plugin-uidl-utils-config'

/**
 * 编辑器 UIDL 工具集配置初始化插件属性扩展高等类型
 */
export interface EditorPluginUidlUtilsConfigInitPropertiesExtHkt<
  Plugin extends AnyEditorPlugin,
> {
  editorInitOptions: {
    /**
     * UIDL 工具集配置，使用 merge 合并
     */
    uidlUtilsConfig?: Partial<UidlUtilsConfig<UidlStoreUidl<Plugin>>>
  }
}

/**
 * EditorPluginUidlUtilsConfigInitPropertiesExtHkt 辅助类型
 */
export interface $EditorPluginUidlUtilsConfigInitPropertiesExtHkt
  extends EditorDefaultPropertiesExtHkt {
  type: EditorPluginUidlUtilsConfigInitPropertiesExtHkt<
    EditorDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 编辑器 UIDL 工具集配置初始化插件
 */
export const editorPluginUidlUtilsConfigInit: EditorRawPlugin<
  $EditorPluginUidlUtilsConfigInitPropertiesExtHkt,
  typeof editorPluginUidlUtilsConfig
> = {
  id: 'uidl-utils-config-init',
  initEditor(ctx) {
    merge(ctx.uidlUtilsConfig, ctx.initOptions.uidlUtilsConfig)
  },
}
