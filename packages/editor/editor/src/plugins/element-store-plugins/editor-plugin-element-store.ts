import type { LiteralObject } from '@p-lc/shared'
import type { EditorRawPlugin } from '../../types'
import { type editorPluginUidlStore } from '../uidl-store-plugins'

/**
 * 编辑器元素仓库插件属性扩展
 */
export interface EditorPluginElementStorePropertiesExt {
  editor: {
    /**
     * 元素仓库
     */
    elementStore: LiteralObject
  }
}

/**
 * 编辑器元素仓库插件
 */
export const editorPluginElementStore: EditorRawPlugin<
  EditorPluginElementStorePropertiesExt,
  typeof editorPluginUidlStore
> = {
  id: 'element-store',
  initEditor(ctx) {
    ctx.elementStore = {} as typeof ctx.elementStore
  },
}
