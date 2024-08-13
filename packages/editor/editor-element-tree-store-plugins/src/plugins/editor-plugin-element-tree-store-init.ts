import type { EditorPlugin } from '@p-lc/editor'
import { assign } from 'lodash-uni'
import type { ElementTreeComponents } from './editor-plugin-element-tree-store'
import { type editorPluginElementTreeStore } from './editor-plugin-element-tree-store'

/**
 * 编辑器元素树仓库初始化插件属性扩展
 */
export interface EditorPluginElementTreeStoreInitPropertiesExt {
  editorInitOptions: {
    /**
     * 元素树
     */
    elementTree?: {
      /**
       * 组件
       */
      components?: Partial<ElementTreeComponents>
    }
  }
}

/**
 * 编辑器元素树仓库初始化插件
 */
export const editorPluginElementTreeStoreInit: EditorPlugin<
  EditorPluginElementTreeStoreInitPropertiesExt,
  typeof editorPluginElementTreeStore
> = {
  id: 'element-tree-store-init',
  initEditor(ctx) {
    const { elementTreeStore } = ctx
    assign(elementTreeStore.components, ctx.initOptions.elementTree?.components)
  },
}
