import type { UidlUtilsConfig } from '@p-lc/uidl-utils'
import { defaultEditorUidlUtilsConfig } from '@p-lc/uidl-utils'
import { cloneDeep } from 'lodash-uni'
import type {
  AnyEditorPlugin,
  EditorDefaultPropertiesExtHkt,
  EditorDefaultPropertiesExtHktPlugin,
  EditorRawPlugin,
} from '../../types'
import type { UidlStoreUidl } from '../uidl-store-plugins'
import { type editorPluginUidlStore } from '../uidl-store-plugins'

/**
 * 编辑器 UIDL 工具集配置插件属性扩展高等类型
 */
export interface EditorPluginUidlUtilsConfigPropertiesExtHkt<
  Plugin extends AnyEditorPlugin,
> {
  editor: {
    /**
     * UIDL 工具集配置
     */
    uidlUtilsConfig: UidlUtilsConfig<UidlStoreUidl<Plugin>>
  }
}

/**
 * EditorPluginUidlUtilsConfigPropertiesExtHkt 辅助类型
 */
export interface $EditorPluginUidlUtilsConfigPropertiesExtHkt
  extends EditorDefaultPropertiesExtHkt {
  type: EditorPluginUidlUtilsConfigPropertiesExtHkt<
    EditorDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 编辑器 UIDL 工具集配置插件
 */
export const editorPluginUidlUtilsConfig: EditorRawPlugin<
  $EditorPluginUidlUtilsConfigPropertiesExtHkt,
  typeof editorPluginUidlStore
> = {
  id: 'uidl-utils-config',
  initEditor(ctx) {
    ctx.uidlUtilsConfig = cloneDeep(
      defaultEditorUidlUtilsConfig as unknown as typeof ctx.uidlUtilsConfig,
    )
  },
}
