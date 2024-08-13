import type { EditorPlugin } from '@p-lc/editor'
import type { LcTypesUidl } from '@p-lc/lc-types-uidl'

/**
 * 编辑器低代码类型 UIDL 插件属性扩展
 */
export interface EditorPluginLcTypesUidlPropertiesExt {
  editor: {
    /**
     * UIDL 仓库
     */
    uidlStore: {
      /**
       * UIDL
       */
      uidl: LcTypesUidl | null
    }
  }
}

/**
 * 编辑器低代码类型 UIDL 插件
 */
export const editorPluginLcTypesUidl: EditorPlugin<EditorPluginLcTypesUidlPropertiesExt> =
  {
    id: 'lc-types-uidl',
  }
