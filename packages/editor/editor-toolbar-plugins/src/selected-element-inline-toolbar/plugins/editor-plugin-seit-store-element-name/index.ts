import type { SeitItem } from '../editor-plugin-seit-store'
import { type editorPluginSeitStore } from '../editor-plugin-seit-store'
import { SeitElementName } from './seit-element-name'

export * from './seit-element-name'

/**
 * 选中元素内联工具栏条目：元素名
 */
export const seitItemElementName: SeitItem = {
  id: 'element-name',
  groupIndex: 0,
  index: 10,
  Component: SeitElementName,
}

/**
 * 编辑器选中元素内联工具栏仓库元素名插件
 */
export const editorPluginSeitStoreElementName: typeof editorPluginSeitStore = {
  id: 'seit-store-element-name',
  initEditor(ctx) {
    const { seitStore } = ctx
    seitStore.items[seitItemElementName.id] = seitItemElementName
  },
}
